// src/components/Step4Colors.tsx
import { component$, useStore } from '@builder.io/qwik';
import { colorOptions } from './colorOption';
import "./step4Colors.css";
import { AppHeader } from './components/header/header';

export const Step4Colors = component$((props: { 
  initialSelected?: number[];       // Parent'ten gelirse dolu gelsin
  onNext$: (selectedIds: number[]) => void; 
  onBack$: () => void;
}) => {

  // 🚀 Local state artık props.initialSelected ile başlatılıyor
  const state = useStore({ selected: props.initialSelected || [] as number[] });

  const toggle = (id: number) => {
    if (state.selected.includes(id)) {
      state.selected = state.selected.filter(x => x !== id);
    } else {
      state.selected = [...state.selected, id];
    }
  };

  return (
    <div class="step4">
          <AppHeader />
      <div class="step4-content">
        <div class="step4-header">
          <div class="step4-text">
            <h2>Pick some colors you like</h2>
            <p class="step4-description">
              Birden fazla renk seçebilirsin.
            </p>
          </div>

        
        </div>

        {/* COLOR OPTIONS */}
        <div class="step4-options">
  {colorOptions.map(option => (
    <button
      key={option.id}
      class={`step4-color ${state.selected.includes(option.id) ? 'selected' : ''}`}
      onClick$={() => toggle(option.id)}
      style={{
        backgroundImage: `url(${option.image})`,
      }}
    >
      <div class="color-overlay">
        <h3 class="color-title">{option.title}</h3>
        <p class="color-desc">{option.description}</p>
      </div>

      {state.selected.includes(option.id) }
    </button>
  ))}
</div>

  <div class="step4-continue-container">
             <button class="step4-back-button" onClick$={props.onBack$}>
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
            class="step4-continue-right"
            disabled={state.selected.length === 0}
               onClick$={() => props.onNext$(state.selected)}
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
});


   
