import { component$, useStore } from "@builder.io/qwik";
import { allFavicons, Favicon } from "./allFavicons";
import "./step3Favicons.css";
import { AppHeader } from "./components/header/header";

export const Step3Favicons = component$(
  (props: {
    category: string;
    onNext$: (selectedFaviconIds: number[]) => void;
    onBack$: () => void;
  }) => {
    const state = useStore({
      selectedFaviconIds: [] as number[],
    });

    /*
  faviconları filtrele
  */
    const favicons: Favicon[] = allFavicons
      .filter((f) => f.category === props.category)
      .slice(0, 8);

    /*
  select toggle
  */
    const toggleSelect = (id: number) => {
      if (state.selectedFaviconIds.includes(id)) {
        state.selectedFaviconIds = state.selectedFaviconIds.filter(
          (selectedId) => selectedId !== id,
        );
      } else {
        state.selectedFaviconIds = [...state.selectedFaviconIds, id];
      }
    };

    return (
      <div class="step3">
        <AppHeader />

        {/* CONTENT */}
        <div class="step3-content">
          <div class="step3-header">
            <div class="step3-text">
              <h2>Pick some logos you like</h2>

              <p class="step3-description">
                Use Looka’s AI-powered platform to design a logo and brand you
                love.
              </p>
            </div>
          </div>

          {/* favicon grid */}
          <div class="step3-favicon-options">
            {favicons.map((f) => (
              <div
                key={f.id}
                class={`step3-favicon-item ${
                  state.selectedFaviconIds.includes(f.id) ? "selected" : ""
                }`}
                onClick$={() => toggleSelect(f.id)}
              >
                <img src={f.iconPath} alt="" class="favicon-img" />
              </div>
            ))}
          </div>
        </div>

        <div class="step3-continue-container">
         <button class="step3-back-button" onClick$={props.onBack$}>
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
            class="step3-continue-right"
            disabled={state.selectedFaviconIds.length === 0}
            onClick$={() => props.onNext$(state.selectedFaviconIds)}
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
    );
  },
);
