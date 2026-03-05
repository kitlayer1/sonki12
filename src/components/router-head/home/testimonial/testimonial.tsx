import { component$ } from "@builder.io/qwik";
import "./testimonial.css";

export const HomeTestimonial = component$(() => {
  return (
    <section class="home-testimonial">
      <div class="testimonial-container">

        {/* CARD 1 */}
        <div class="testimonial-card">
          <div class="card-content">
            <h3>Enter Your Brand Details</h3>
            <p>
             Add your business name, industry, and style preferences to generate logo ideas tailored to your brand.
            </p>

            <div class="card-image">
              <img src="/images/home/testimonial/testimonial1.jpg" alt="Brand Details" />
            </div>
          </div>

          <button class="discover-btn">Discover</button>
        </div>

        {/* CARD 2 */}
        <div class="testimonial-card">
          <div class="card-content">
            <h3>Customize Your Logo</h3>
            <p>
            Adjust colors, fonts, and icons to create a design that perfectly represents your business and reflects your unique brand identity.
            </p>

            <div class="card-image">
              <img src="/images/home/testimonial/testimonial2.jpg" alt="Logo Customize" />
            </div>
          </div>

          <button class="discover-btn">Discover</button>
        </div>

        {/* CARD 3 */}
        <div class="testimonial-card">
          <div class="card-content">
            <h3>Download Instantly</h3>
            <p>
             Get high-resolution logo files ready for websites, social media, print materials, and professional branding use.
            </p>

            <div class="card-image">
              <img src="/images/home/testimonial/testimonial3.jpg" alt="Download Logo" />
            </div>
          </div>

          <button class="discover-btn">Discover</button>
        </div>

      </div>
    </section>
  );
});
