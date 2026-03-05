import { component$,useStore,useSignal,$,useVisibleTask$,} from "@builder.io/qwik";
import "./step2Category.css";
import { AppHeader } from "./components/header/header";

export const Step2Category = component$(
  (props: {
    initialCategory?: string;
    onNext$: (cat: string) => void;
    onBack$: () => void;
  }) => {
    /* =========================
     STATE
  ========================= */

    const store = useStore({
      category: props.initialCategory || "",
    });

    const isOpen = useSignal(false);
    const wrapperRef = useSignal<HTMLElement>();

    /* =========================
     DATA
  ========================= */

    const categories = [
      "Agriculture",
      "Art & Design",
      "Automotive",
      "Beauty",
      "Community",
      "Construction",
      "Crypto",
      "E-commerce",
      "Education",
      "Energy",
      "Events",
      "Fashion",
      "Finance",
      "Food & Drink",
      "Gaming",
      "Health & Medical",
      "Kids",
      "Legal & Security",
      "Media",
      "Pets & Animals",
      "Real Estate",
      "Software",
      "Sports",
      "Technology",
      "Transport",
      "Travel",
    ];

    /* =========================
     ACTIONS
  ========================= */

    const toggle = $(() => {
      isOpen.value = !isOpen.value;
    });

    const close = $(() => {
      isOpen.value = false;
    });

    const selectCategory = $((cat: string) => {
      store.category = cat;
      close();
    });

    const clearCategory = $(() => {
      store.category = "";
      close();
    });

    /* =========================
     OUTSIDE CLICK CLOSE
  ========================= */

    useVisibleTask$(({ cleanup }) => {
      const handler = (event: MouseEvent) => {
        if (!wrapperRef.value) return;

        if (!wrapperRef.value.contains(event.target as Node)) {
          isOpen.value = false;
        }
      };

      document.addEventListener("click", handler);

      cleanup(() => {
        document.removeEventListener("click", handler);
      });
    });

    /* =========================
     FULL PAGE SCROLL LOCK
     (PAGE NEVER SCROLLS)
  ========================= */

    useVisibleTask$(({ cleanup }) => {
      const html = document.documentElement;
      const body = document.body;

      const scrollY = window.scrollY;

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";

      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      cleanup(() => {
        const storedScrollY = body.style.top;

        html.style.overflow = "";
        body.style.overflow = "";

        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        body.style.width = "";

        if (storedScrollY) {
          window.scrollTo(0, parseInt(storedScrollY) * -1);
        }
      });
    });

    /* =========================
     UI
  ========================= */

    return (
      <div class="step2">
        <AppHeader />

        <div class="step2-content">
          {/* HEADER */}

          <div class="step2-header">
            <div class="step2-text">
              <h2>Choose Brand Category</h2>

              <p class="step2-description">
                Select the category that best represents your brand. This helps
                us tailor the logo design to your industry and style.
              </p>
            </div>
          </div>

          {/* SELECT */}

          <div class="step2-input-container">
            <div ref={wrapperRef} class="input-wrapper custom-select-wrapper">
              <button
                type="button"
                preventdefault:click
                class={`custom-select-triggers ${store.category ? "selected" : ""}`}
                onClick$={toggle}
              >
                <span class="custom-select-text">
                  {store.category || "Industry"}
                </span>

                <svg
                  class={`custom-select-arrow ${isOpen.value ? "rotated" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>

              {isOpen.value && (
                <ul class="custom-select-options">
                  <li
                    class="custom-select-option placeholder"
                    onClick$={clearCategory}
                  >
                    Industry
                  </li>

                  {categories.map((cat) => (
                    <li
                      key={cat}
                      class={`custom-select-option ${store.category === cat ? "selected" : ""}`}
                      onClick$={() => selectCategory(cat)}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* BUTTONS */}

          <div class="step2-continue-container">
            <button class="step2-back-button" onClick$={props.onBack$}>
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
              class="step2-continue-right"
              disabled={!store.category}
              onClick$={() => props.onNext$(store.category)}
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
