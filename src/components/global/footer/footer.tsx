import { component$ } from "@builder.io/qwik";
import "./footer.css";

export const Footer = component$(() => {
  return (
    <footer class="footer">
      <div class="footer__container">
        {/* LEFT */}
        <div class="footer__left">
          <div class="footer__brand">
            {/* Logo sadece resim */}
            <img 
              src="/images/logo.svg" 
              alt="Delege Logo" 
              class="footer__logo-image"
            />
          </div>


          <div class="footer__socials">
            <a href="#" class="footer__social">
              in
            </a>
            <a href="#" class="footer__social">
              ig
            </a>
          </div>

          <p class="footer__copyright">
            Copyright © 2025 Kitlayer.com - All rights reserved.
          </p>
        </div>

        {/* Menü */}
        <div class="footer__column">
          <h4 class="footer__title">About</h4>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Faq's</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Kaynaklar */}
        <div class="footer__column">
          <h4 class="footer__title">Logo Design</h4>
          <ul>
            <li>
              <a href="#">Food Logo Maker</a>
            </li>
            <li>
              <a href="#">Education Logo Maker</a>
            </li>
            <li>
              <a href="#">Gaming Logo Maker</a>
            </li>
            <li>
              <a href="#">Travel Logo Maker</a>
            </li>
            <li>
              <a href="#">Beauty Logo Maker</a>
            </li>
          </ul>
        </div>

        {/* Yeni Menü 1 */}
        <div class="footer__column">
          <h4 class="footer__title">Blog</h4>
          <ul>
            <li>
              <a href="#">Hakkımızda</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Kariyer</a>
            </li>
            <li>
              <a href="#">Basın</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
});
