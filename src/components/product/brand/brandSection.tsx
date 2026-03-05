import { component$ } from "@builder.io/qwik";
import './brandSection.css';

export const BrandSection = component$(() => {
  return (
    <section class="brand-section">
      <div class="container">
        <h1 class="brand-title">
        Create the Perfect Logo to Elevate
          <br />
          Your Brand and Stand Out
        </h1>
        <p class="brand-subtitle">
        Explore a wide range of professional logos crafted for every industry, helping your brand stand out, make an impact, and leave a lasting impression.
        </p>

        {/* Kartlar Slider */}
        <div class="cards-slider">
          <div class="slider-track">
            {/* İlk set */}
            <div class="brand-card technology">
              <div class="card-content">
                <h3>Technology</h3>
                <p>Innovative and modern logos that showcase your tech brand’s vision and professionalism.</p>
              </div>
              <div class="white-box"></div>
            </div>

            <div class="brand-card fashion">
              <div class="card-content">
                <h3>Fashion</h3>
                <p>Stylish, trend-focused logos that highlight your brand’s unique style.</p>
              </div>
              <div class="white-box"></div>
            </div>

            <div class="brand-card food">
              <div class="card-content">
                <h3>Food</h3>
                <p>Appetite-catching logos for restaurants, cafes, and food brands.</p>
              </div>
              <div class="white-box"></div>
            </div>

            <div class="brand-card health">
              <div class="card-content">
                <h3>Health</h3>
                <p>Trustworthy and professional logos for health and wellness brands.</p>
                </div>
              <div class="white-box"></div>
            </div>


            <div class="brand-card ecommerce">
              <div class="card-content">
                <h3>E-commerce</h3>
                <p>Modern, memorable logos designed to promote your online store effectively.</p>
              </div>
              <div class="white-box"></div>
            </div>


            <div class="brand-card education">
              <div class="card-content">
                <h3>Education</h3>
                <p>Meaningful logos for educational institutions and social projects.</p>
              </div>
              <div class="white-box"></div>
            </div>


            <div class="brand-card travel">
              <div class="card-content">
                <h3>Travel</h3>
                <p>Eye-catching logos that capture the spirit of travel and adventure.</p>
              </div>
              <div class="white-box"></div>
            </div>

            <div class="brand-card beauty">
              <div class="card-content">
                <h3>Beauty</h3>
                <p>Elegant and striking logos for beauty and personal care brands.</p>
              </div>
              <div class="white-box"></div>
            </div>

            <div class="brand-card sports">
              <div class="card-content">
                <h3>Sports</h3>
                <p>Dynamic, energetic logos that reflect movement and teamwork.</p>
              </div>
              <div class="white-box"></div>
            </div>

            {/* Sonsuz kaydırma için tekrar */}
            <div class="brand-card technology">
              <div class="card-content">
                <h3>Technology</h3>
                <p>Innovative and modern logos that showcase your tech brand’s vision and professionalism.</p>
              </div>
              <div class="white-box"></div>
            </div>

            <div class="brand-card fashion">
              <div class="card-content">
                <h3>Fashion</h3>
                <p>Stylish, trend-focused logos that highlight your brand’s unique style.</p>
              </div>
              <div class="white-box"></div>
            </div>

            <div class="brand-card food">
              <div class="card-content">
                <h3>Food</h3>
                <p>Appetite-catching logos for restaurants, cafes, and food brands.</p>
              </div>
              <div class="white-box"></div>
            </div>

            <div class="brand-card health">
              <div class="card-content">
                <h3>Health</h3>
                <p>Trustworthy and professional logos for health and wellness brands.</p>
                </div>
              <div class="white-box"></div>
            </div>


            <div class="brand-card ecommerce">
              <div class="card-content">
                <h3>E-commerce</h3>
                <p>Modern, memorable logos designed to promote your online store effectively.</p>
              </div>
              <div class="white-box"></div>
            </div>


            <div class="brand-card education">
              <div class="card-content">
                <h3>Education</h3>
                <p>Meaningful logos for educational institutions and social projects.</p>
              </div>
              <div class="white-box"></div>
            </div>


            <div class="brand-card travel">
              <div class="card-content">
                <h3>Travel</h3>
                <p>Eye-catching logos that capture the spirit of travel and adventure.</p>
              </div>
              <div class="white-box"></div>
            </div>

            <div class="brand-card beauty">
              <div class="card-content">
                <h3>Beauty</h3>
                <p>Elegant and striking logos for beauty and personal care brands.</p>
              </div>
              <div class="white-box"></div>
            </div>

            <div class="brand-card sports">
              <div class="card-content">
                <h3>Sports</h3>
                <p>Dynamic, energetic logos that reflect movement and teamwork.</p>
              </div>
              <div class="white-box"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});