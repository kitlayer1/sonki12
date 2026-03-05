import { component$ } from "@builder.io/qwik";
import "./LoadingOverlay.css";

export const LoadingOverlay = component$(() => {
  return (
    <div class="loading-overlay">
      <div class="loading-center">

        {/* İstersen buraya SVG logo koyabilirsin */}
        <div class="loading-box" />

      </div>
    </div>
  );
});