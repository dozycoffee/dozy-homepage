import Link from "next/link";
import { siteConfig } from "@/content/site";
import type { LabeledValue } from "@/content/types";
import { resolveAsset } from "@/lib/assets";
import { isExternalUrl, isUsableUrl } from "@/lib/links";
import { Logo } from "./Logo";

const linkClass = "rounded-button type-caption font-medium text-espresso underline-offset-4 hover:underline";

/** 값이 있는 항목만 남긴다. 받지 않은 정보는 화면에 쓰지 않는다. */
const filled = (items: LabeledValue[]) =>
  items.filter((item): item is { label: string; value: string } => Boolean(item.value));

export function SiteFooter() {
  const company = filled(siteConfig.company);
  const contact = filled(siteConfig.contact);
  const policies = [
    { label: "이용약관", href: siteConfig.links.terms },
    { label: "개인정보처리방침", href: siteConfig.links.privacy },
  ].filter((item): item is { label: string; href: string } => isUsableUrl(item.href));
  const social = siteConfig.social.filter((item) => isUsableUrl(item.url));

  return (
    <footer className="border-t border-oat bg-cream py-12 md:py-16">
      <div className="content-frame flex flex-col gap-8">
        <Logo symbolSrc={resolveAsset(siteConfig.logo)} />

        {(company.length > 0 || contact.length > 0) && (
          <div className="flex flex-col gap-4 type-caption md:flex-row md:gap-12">
            {[company, contact]
              .filter((group) => group.length > 0)
              .map((group) => (
                <dl key={group[0].label} className="flex flex-col gap-1">
                  {group.map((item) => (
                    <div key={item.label} className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold">{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ))}
          </div>
        )}

        {(policies.length > 0 || social.length > 0) && (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {policies.length > 0 && (
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {policies.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {social.length > 0 && (
              <ul aria-label="공식 SNS" className="flex flex-wrap gap-x-6 gap-y-2">
                {social.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      {...(isExternalUrl(item.url) && { target: "_blank", rel: "noopener noreferrer" })}
                      className={linkClass}
                    >
                      {item.label}
                      {isExternalUrl(item.url) && <span className="sr-only"> (새 창)</span>}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <p className="type-caption">
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
