import { component$ } from "@builder.io/qwik";
import "./homehero.css";

interface Props {
  title: string;
  description: string;
  subText?: string;
  placeholder?: string;
  buttonText?: string;
  image: string;
  badgeText?: string;
}

export const HomeHero = component$((props: Props) => {
  return (
    <section class="homehero">
      <div class="homehero-container">
        <div class="homehero-left">
          {props.badgeText && (
            <div class="homehero-badge">
              {props.badgeText}
            </div>
          )}

          <h1 class="homehero-title">
            {props.title}
          </h1>

          <p class="homehero-description">
            {props.description}
          </p>
 
          <div class="homehero-input">
            <input
              class="homehero-input-field"
              placeholder={props.placeholder || "Enter brand name"}
            />

            <button class="homehero-input-button">
              {props.buttonText || "Generate"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
            </button>
          </div>

          {props.subText && (
            <p class="homehero-sub">
              {props.subText}
            </p>
          )}
        </div>

        <div class="homehero-right">
          <img
            class="homehero-mainimg"
            src={props.image}
            alt={props.title}
          />
        </div>
      </div>
    </section>
  );
});
