import { component$ } from "@builder.io/qwik";
import "./homeSection.css";

export const HomeSection = component$(() => {
  return (
    <section class="home-section">
      <div class="home-section__content">
        <span class="home-section__badge">
         No Design Skills Required.
        </span>

        <h1 class="home-section__title">
         Design a Professional <br /> Logo in Minutes
        </h1>

        <p class="home-section__description">
         Create fully customizable, high-resolution logos without any design experience. Bring your brand to life instantly.
        </p>
      </div>

      <div class="home-section__image-wrapper">
        <img
          src="/images/home/section/homeSection.jpg"
          alt="Product dashboard preview"
          class="home-section__image"
        />
      </div>
    </section>
  );
});