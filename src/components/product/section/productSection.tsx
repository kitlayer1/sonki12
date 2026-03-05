import { component$ } from "@builder.io/qwik";
import "./productSection.css";

interface ProductSectionProps {
  badge?: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: "left" | "right";
}

export const ProductSection = component$<ProductSectionProps>(
  ({
    badge,
    title,
    description,
    image,
    imagePosition = "right",
  }) => {
    return (
      <section class="product-section">
        <div
          class={`product-section__container ${
            imagePosition === "left" ? "reverse" : ""
          }`}
        >
          <div class="product-section__left">
            {badge && (
              <span class="product-section__badge">{badge}</span>
            )}
            <h2 class="product-section__title">{title}</h2>
            <p class="product-section__description">{description}</p>
          </div>

          <div class="product-section__right">
            <img src={image} alt="Product visual" />
          </div>
        </div>
      </section>
    );
  }
);