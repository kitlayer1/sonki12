import { component$ } from "@builder.io/qwik";
import "./categorySlider.css";

interface SliderItem {
  img: string;
}

interface Props {
  title: string;
  description: string;
  topItems: SliderItem[];
}

export const CategorySlider = component$<Props>(
  ({ title, description, topItems}) => {
    return (
      <section class="marquee-section">
        {/* HEADER */}
        <div class="marquee-header">
          <h2 class="marquee-title">{title}</h2>
          <p class="marquee-description">{description}</p>
        </div>

        {/* TOP ROW */}
        <div class="marquee-row">
          <div class="marquee-track animate-left">
            {[...topItems, ...topItems].map((item, i) => (
              <div key={i} class="marquee-card">
                <img src={item.img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);
