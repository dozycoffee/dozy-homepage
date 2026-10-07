// 원본 이미지(assets-src/)를 이미지 자리 규칙에 맞게 변환해 public/assets/images/에 넣는다.
//
//   pnpm images          새로 바뀐 원본만 변환
//   pnpm images --force  모든 원본을 다시 변환
//   pnpm images:check    public/assets/images/의 파일을 검사 (형식, 크기, 비율)
//
// 원본 파일명은 공개 파일명에서 확장자만 다르게 둔다 (예: assets-src/hero-coffee-desktop.png → hero-coffee-desktop.webp).
// 규칙은 docs/design-system.md의 "이미지"가 기준이다.

import { copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import { extname, join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { imageSlots } from "./image-slots.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC_DIR = join(ROOT, "assets-src");
const OUT_DIR = join(ROOT, "public/assets/images");
// 같은 파일명으로 바꾸면 Next.js가 최적화해 둔 옛 이미지를 계속 보여 주므로 함께 지운다.
const NEXT_IMAGE_CACHES = [join(ROOT, ".next/dev/cache/images"), join(ROOT, ".next/cache/images")];

const RASTER_INPUTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".tif", ".tiff", ".gif"]);
const QUALITY = { webp: 82, jpeg: 85 };
/** 이 비율 차이(2%)를 넘으면 화면에서 많이 잘린다고 경고한다. */
const RATIO_TOLERANCE = 0.02;

const slotsByName = new Map(imageSlots.map((slot) => [parse(slot.file).name, slot]));
const args = new Set(process.argv.slice(2));
const kb = (bytes) => `${Math.round(bytes / 1024).toLocaleString()}KB`;

/** 권장 크기와 비교한 경고 목록 */
function sizeWarnings(slot, width, height) {
  if (!slot.width || !slot.height) return [];
  const warnings = [];
  if (width < slot.width || height < slot.height) {
    warnings.push(`권장 ${slot.width}×${slot.height}보다 작음`);
  }
  const ratio = width / height;
  const expected = slot.width / slot.height;
  if (Math.abs(ratio / expected - 1) > RATIO_TOLERANCE) {
    warnings.push(`비율 ${ratio.toFixed(2)}:1, 권장 ${expected.toFixed(2)}:1 (표시할 때 더 잘림)`);
  }
  return warnings;
}

async function exists(path) {
  return stat(path).then(
    () => true,
    () => false,
  );
}

async function convert() {
  if (!(await exists(SRC_DIR))) {
    await mkdir(SRC_DIR, { recursive: true });
    console.log(`원본 폴더를 만들었습니다: assets-src/\n공개 파일명과 같은 이름(확장자만 다르게)으로 원본을 넣고 다시 실행하세요.`);
    return;
  }
  await mkdir(OUT_DIR, { recursive: true });

  const sources = (await readdir(SRC_DIR)).filter((name) => !name.startsWith("."));
  let written = 0;
  let problems = 0;

  for (const name of sources) {
    const { name: base, ext } = parse(name);
    const slot = slotsByName.get(base);
    if (!slot) {
      console.warn(`- 건너뜀  ${name}: 이미지 자리 목록(scripts/image-slots.mjs)에 없는 이름`);
      problems += 1;
      continue;
    }
    const input = join(SRC_DIR, name);
    const output = join(OUT_DIR, slot.file);
    const outExt = extname(slot.file).toLowerCase();

    if (!args.has("--force") && (await exists(output))) {
      const [src, out] = await Promise.all([stat(input), stat(output)]);
      if (out.mtimeMs >= src.mtimeMs) continue;
    }

    // 벡터·아이콘은 변환하지 않고 같은 형식일 때만 복사한다.
    if (!slot.width) {
      if (ext.toLowerCase() !== outExt) {
        console.warn(`- 건너뜀  ${name}: ${slot.file}는 ${outExt} 원본이 필요함`);
        problems += 1;
        continue;
      }
      await copyFile(input, output);
      console.log(`- 복사    ${name} → ${slot.file}`);
      written += 1;
      continue;
    }

    if (!RASTER_INPUTS.has(ext.toLowerCase())) {
      console.warn(`- 건너뜀  ${name}: 지원하지 않는 형식 (${[...RASTER_INPUTS].join(", ")})`);
      problems += 1;
      continue;
    }

    // 사진 방향(EXIF)을 바로잡고, 권장 크기 안으로만 줄인다. 키우거나 자르지 않는다.
    const image = sharp(input).rotate().resize({
      width: slot.width,
      height: slot.height,
      fit: "outside",
      withoutEnlargement: true,
    });
    const encoded = outExt === ".jpg" ? image.jpeg({ quality: QUALITY.jpeg, mozjpeg: true }) : image.webp({ quality: QUALITY.webp, effort: 5 });
    const info = await encoded.toFile(output);
    const before = (await stat(input)).size;
    const warnings = sizeWarnings(slot, info.width, info.height);
    problems += warnings.length;
    console.log(
      `- 변환    ${name} → ${slot.file}  ${info.width}×${info.height}  ${kb(before)} → ${kb(info.size)}` +
        warnings.map((warning) => `\n          ! ${warning}`).join(""),
    );
    written += 1;
  }

  if (written > 0) {
    await Promise.all(NEXT_IMAGE_CACHES.map((dir) => rm(dir, { recursive: true, force: true })));
  }
  console.log(`\n${written}개 변환·복사${problems ? `, 확인할 것 ${problems}개` : ""}.${written ? " Next.js 이미지 캐시를 비웠습니다. 브라우저는 강력 새로고침하세요." : ""}`);
}

async function check() {
  const files = new Set((await readdir(OUT_DIR)).filter((name) => !name.startsWith(".")));
  let problems = 0;
  const report = (file, message) => {
    problems += 1;
    console.warn(`- ${file}: ${message}`);
  };

  for (const slot of imageSlots) {
    if (!files.has(slot.file)) {
      console.log(`- ${slot.file}: 없음 (화면에는 배경색 자리가 보임)`);
      continue;
    }
    files.delete(slot.file);
    if (!slot.width) continue;
    const meta = await sharp(join(OUT_DIR, slot.file)).metadata();
    const expectedFormat = extname(slot.file) === ".jpg" ? "jpeg" : "webp";
    if (meta.format !== expectedFormat) report(slot.file, `확장자는 ${expectedFormat}인데 실제 형식은 ${meta.format}`);
    for (const warning of sizeWarnings(slot, meta.width, meta.height)) report(slot.file, `${meta.width}×${meta.height}, ${warning}`);
    const { size } = await stat(join(OUT_DIR, slot.file));
    if (size > 600 * 1024) report(slot.file, `${kb(size)}. 원본을 assets-src/에 넣고 pnpm images로 다시 저장하면 줄어듦`);
  }
  for (const extra of files) report(extra, "이미지 자리 목록에 없는 파일 (공개 주소로 열림)");

  console.log(problems ? `\n확인할 것 ${problems}개.` : "\n문제 없음.");
  if (problems) process.exitCode = 1;
}

await (args.has("--check") ? check() : convert());
