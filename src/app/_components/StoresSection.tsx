import { MediaImage } from "@/components/MediaImage";
import { RevealOnView } from "@/components/RevealOnView";
import { StoreSearchForm } from "@/components/StoreSearchForm";
import { storesSection } from "@/content/home";
import { resolveImage } from "@/lib/assets";

const imageLayouts = [
  { className: "store-showcase-primary", sizes: "(min-width: 768px) 67vw, 100vw" },
  { className: "store-showcase-neighborhood", sizes: "(min-width: 768px) 60vw, 60vw" },
  { className: "store-showcase-campus", sizes: "(min-width: 768px) 60vw, 50vw" },
];

export function StoresSection() {
  return (
    <section id="stores" aria-labelledby="stores-title" className="store-showcase-section relative bg-cream">
      <h2 id="stores-title" className="sr-only">{storesSection.title}</h2>
      <RevealOnView className="store-showcase-gallery">
        {storesSection.images.map((slot, index) => (
          <MediaImage key={slot.src} image={resolveImage(slot)} fit="cover" tone="oat"
            className={`store-showcase-image ${imageLayouts[index].className}`}
            sizes={imageLayouts[index].sizes} />
        ))}
      </RevealOnView>
      <div className="store-showcase-search">
        <StoreSearchForm id="home-store-search" variant="bar" />
      </div>
    </section>
  );
}
