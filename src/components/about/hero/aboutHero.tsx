import { component$ } from "@builder.io/qwik";
import "./aboutHero.css";

export const AboutHero = component$(() => {
  return (
    <section class="about-hero">
      <div class="about-hero-container">
        <h1 class="about-hero-title">About</h1>
        <p class="about-hero-subtitle">
We make professional logo design accessible to everyone. Create a logo that truly represents your brand — quickly and effortlessly.
        </p>

        <div class="about-hero-cards">
          {/* Card 1 */}
          <div class="about-card">
            <div class="about-card-header">
              <span class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-Width="1.5"
                  stroke-Linecap="round"
                  stroke-Linejoin="round"
                >
                  <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                  <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                </svg>
              </span>
              <h3>FAQs</h3>
            </div>
            <p>
              Find answers to the most common questions about our logo design
              process and services.
            </p>
            <button
              class="about-btn"
              onClick$={() => (window.location.href = "/faqs")}
            >
              Faq's
            </button>
          </div>

          {/* Card 2 */}
          <div class="about-card">
            <div class="about-card-header">
              <span class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-Width="1.5"
                  stroke-Linecap="round"
                  stroke-Linejoin="round"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </span>
              <h3>Contact Us</h3>
            </div>
            <p>
              Get in touch with our team for personalized support, inquiries, or
              custom design requests.
            </p>
            <button
              class="about-btn"
              onClick$={() => (window.location.href = "/contact")}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
