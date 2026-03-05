// src/components/Step5Style.tsx
import { component$, useStore, $ } from "@builder.io/qwik";
import "./step5Style.css";
import { AppHeader } from "./components/header/header";

export const Step5Style = component$(
  (props: {
    initialStyleId?: number;
    onNext$: (styleId: number) => void;
    onBack$: () => void;
  }) => {
    const state = useStore({
      selectedStyleId: props.initialStyleId || 0,
      showPopup: false,
    });

    // 🚀 Continue → Direkt sonraki adıma geç
    const handleContinue = $(() => {
      if (state.selectedStyleId === 0) return;
      props.onNext$(state.selectedStyleId);
    });

    const styles = [
      { id: 1, name: "Classics", image: "/images/app/font/1.svg" },
      { id: 2, name: "Retro", image: "/images/app/font/2.svg" },
      { id: 3, name: "Modern", image: "/images/app/font/3.svg" },
      { id: 4, name: "Funky", image: "/images/app/font/4.svg" },
      { id: 5, name: "Elegant", image: "/images/app/font/5.svg" },
      { id: 6, name: "Playful", image: "/images/app/font/6.svg" },
      { id: 7, name: "Tech", image: "/images/app/font/7.svg" },
      { id: 8, name: "Luxury", image: "/images/app/font/8.svg" },
    ];

    return (
      <div class="step5">
        <AppHeader />
        <div class="step5-content">
          <div class="step5-header">
            <div class="step5-text">
              <h2>Pick some styles you like</h2>
              <p class="step5-description">
                Use Looka’s AI-powered platform to design a logo and brand you
                love.
              </p>
            </div>
          </div>

          {/* STYLE OPTIONS */}
          <div class="step5-options">
            {styles.map((s) => (
              <div
                key={s.id}
                class={`step5-style-item ${state.selectedStyleId === s.id ? "selected" : ""}`}
                onClick$={() => {
                  state.selectedStyleId =
                    state.selectedStyleId === s.id ? 0 : s.id;
                }}
              >
                <img src={s.image} alt={s.name} class="style-image-full" />
              </div>
            ))}
          </div>

          <div class="step5-continue-container">
            <button class="step5-back-button" onClick$={props.onBack$}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </button>

            <button
              class="step5-continue-right"
              disabled={state.selectedStyleId === 0}
              onClick$={handleContinue}
            >
              Continue
              <span class="arrow-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  },
);
