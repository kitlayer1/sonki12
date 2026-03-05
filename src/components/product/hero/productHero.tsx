import { component$ } from '@builder.io/qwik';
import './productHero.css';

interface ProductHeroProps {
  badgeText?: string;
  title: string;
  description: string;
  buttonText?: string;
  image: string;
}

export const ProductHero = component$<ProductHeroProps>(
  ({
    badgeText = 'No design knowledge needed',
    title,
    description,
    buttonText = 'Get Started',
    image,
  }) => {
    return (
      <section class="product-hero">
        <div class="product-hero__inner">
          <span class="product-hero__badge">{badgeText}</span>

          <h1 class="product-hero__title">{title}</h1>

          <p class="product-hero__description">{description}</p>

          <a href="/app" class="product-hero__button">
  {buttonText}
</a>
        </div>

        <div class="product-hero__image-wrapper">
          <img
            src={image}
            alt={title}
            class="product-hero__image"
            loading="eager"
          />
        </div>
      </section>
    );
  }
);