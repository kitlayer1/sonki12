import { component$ } from "@builder.io/qwik";
import "./homeBrandSlider.css";

interface BrandItem {
  image: string;
  alt?: string;
}

interface HomeBrandSliderProps {
  title: string;
  brands: BrandItem[];
}

export const HomeBrandSlider = component$<HomeBrandSliderProps>(
  ({ title, brands }) => {
    // Infinite için listeyi 2 kez basıyoruz
    const loopBrands = [...brands, ...brands];

    return (
      <section class="home-brand">
        <div class="home-brand-container">
          <div class="home-brand-headers">
          <h2 class="home-brand-title">{title}</h2>
           </div>
          <div class="brand-slider">
            <div class="brand-track">
              {loopBrands.map((brand, index) => (
                <div class="home-brand-card" key={index}>
                  <img src={brand.image} alt={brand.alt || "brand"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);