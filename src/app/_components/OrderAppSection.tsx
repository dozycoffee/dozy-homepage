import { MediaImage } from "@/components/MediaImage";
import { StatusLabel } from "@/components/StatusLabel";
import { orderAppSection } from "@/content/home";
import { resolveImage } from "@/lib/assets";

/** 출시 예정 안내만 한다. 다운로드·주문 버튼, 출시일, 혜택은 넣지 않는다 (docs/pages/home.md). */
export function OrderAppSection() {
  return (
    <section id="order-app" aria-labelledby="order-app-title" className="screen-section bg-cream">
      <div className="content-frame grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">
        <div>
          <StatusLabel lang="en">{orderAppSection.status}</StatusLabel>
          <p lang="en" className="mt-6 text-xl font-semibold md:text-2xl">
            {orderAppSection.serviceName}
          </p>
          <h2 id="order-app-title" className="mt-2 type-title">
            {orderAppSection.title}
          </h2>
          <p className="mt-4 max-w-prose type-lead">{orderAppSection.description}</p>
        </div>
        <MediaImage
          image={resolveImage(orderAppSection.image)}
          fit="cover"
          tone="oat"
          className="aspect-[6/5] rounded-panel"
          sizes="(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw"
        />
      </div>
    </section>
  );
}
