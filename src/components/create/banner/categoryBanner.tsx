import { component$ } from "@builder.io/qwik";
import "./categoryBanner.css";

interface Props {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
}

export const CategoryBanner = component$<Props>(
  ({ title, description, buttonText, buttonLink = "#" }) => {
    return (
      <section class="category-banner">
        <div class="category-banner-content">
          <h2 class="category-banner-title">{title}</h2>
          <p class="category-banner-description">{description}</p>

          <a href={buttonLink} class="category-banner-button">
            {buttonText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    );
  }
);
