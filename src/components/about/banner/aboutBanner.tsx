import { component$ } from '@builder.io/qwik';
import './aboutBanner.css';

interface AboutBannerProps {
  title: string;
  description: string;
  buttonText?: string;
  onClick$?: () => void;
}

export const AboutBanner = component$<AboutBannerProps>(
  ({
    title,
    description,
    buttonText = 'Get Started',
    onClick$,
  }) => {
    return (
       <section class="about-section">
      <section class="about-banner">
        <div class="about-banner__inner">
          <h2 class="about-banner__title">{title}</h2>

          <p class="about-banner__description">
            {description}
          </p>

         <button
  class="about-banner__button"
  onClick$={() => (window.location.href = '/app')}
>
  {buttonText}
  <span class="about-banner__arrow">→</span>
</button>
        </div>
      </section>
      </section>
    );
  }
);