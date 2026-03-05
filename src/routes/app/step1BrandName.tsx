import { component$, useStore, useContext, useVisibleTask$ } from "@builder.io/qwik";
import "./step1BrandName.css";
import { appContext } from "~/store/appContext";
import { AppHeader } from "./components/header/header";

export const Step1BrandName = component$(
  (props: {
    initialBrandName?: string;
    onNext$: (name: string) => void;
    onBack$?: () => void;
  }) => {
    const appStore = useContext(appContext);

    const state = useStore({
      brandName: "",
    });

    // 🔒 Sayfa scroll'unu kilitle ve verileri sıfırla
    useVisibleTask$(() => {
      document.body.style.overflow = "hidden";
      
      // Verileri sıfırla
      state.brandName = "";
      appStore.mainBrandName = "";

      return () => {
        document.body.style.overflow = "auto";
      };
    });

    return (
      <div class="step1">
        <AppHeader />
        <div class="step1-content">

          {/* HEADER */}
          <div class="step1-header">
            <div class="step1-text">
              <h2>Enter Your Brand Name</h2>
              <p class="step1-description">
                Type in your brand name to start creating your logo. This name
                will be the foundation of your entire design process.
              </p>
            </div>
          </div>

          {/* INPUT */}
          <div class="step1-input-container">
            <div class="input-wrapper">
              <input
                type="text"
                value={state.brandName}
                placeholder="Brand Name"
                onInput$={(e: any) => {
                  state.brandName = e.target.value;
                  appStore.mainBrandName = e.target.value;
                }}
              />

              {state.brandName && (
                <button
                  class="clear-input"
                  onClick$={() => {
                    state.brandName = "";
                    appStore.mainBrandName = "";
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div class="step1-continue-container">
            <button
              class="step1-continue-right"
              disabled={!state.brandName}
              onClick$={() => props.onNext$(state.brandName)}
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
  }
);
