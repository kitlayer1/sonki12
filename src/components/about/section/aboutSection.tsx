import { component$ } from '@builder.io/qwik';
import './aboutSection.css';

export const AboutSection = component$(() => {
  return (
    <section class="about-section">
      <div class="about-section-container">
        
        <div class="about-section-content">
          <h2 class="about-section-title">
            Built for Creators,  <br />
           Founders, and <br />
            Growing Brands
          </h2>

          <p class="about-section-text">
            From ambitious startups to personal brands and expanding businesses, we provide the tools you need to create distinctive logos that capture your vision, reflect your identity, and make a lasting impact in a competitive market.
          </p>
        </div>

        <div class="about-section-image">
          <img
            src="/images/about/section/ourMission.jpg"
            alt="About visual"
          />
        </div>

      </div>
    </section>
  );
});