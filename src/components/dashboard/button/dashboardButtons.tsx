import { component$, useSignal } from "@builder.io/qwik";
import "./dashboardButtons.css";

export const DashboardButton = component$(() => {
  const activeTab = useSignal<"all" | "drafts" | "downloads" | "premium">("all");

const AllIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-Width="1.5"
    stroke-Linecap="round"
    stroke-Linejoin="round"
    class="toolbar-icon"
  >
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

 const DraftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-Width="1.5"
    stroke-Linecap="round"
    stroke-Linejoin="round"
    class="toolbar-icon"
  >
    <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
    <path d="M5 17A12 12 0 0 1 17 5" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
  </svg>
);

  const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-Width="1.5"
    stroke-Linecap="round"
    stroke-Linejoin="round"
    class="toolbar-icon"
  >
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    <path d="M12 18v-6" />
    <path d="m9 15 3 3 3-3" />
  </svg>
);



const PremiumIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-Width="1.5"
    stroke-Linecap="round"
    stroke-Linejoin="round"
    class="toolbar-icon"
  >
    <path d="M10.5 3 8 9l4 13 4-13-2.5-6" />
    <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
    <path d="M2 9h20" />
  </svg>
);


const PlusButtonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-Width="1.5"
    stroke-Linecap="round"
    stroke-Linejoin="round"
    class="toolbar-icon"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

  return (
    <div class="dashboard-toolbar">
      {/* LEFT */}
      <div class="toolbar-left">
        <button
          class={{ "toolbar-btn": true, ghost: true, active: activeTab.value === "all" }}
          onClick$={() => (activeTab.value = "all")}
        >
          <AllIcon />
          All
        </button>

        <button
          class={{ "toolbar-btn": true, ghost: true, active: activeTab.value === "drafts" }}
          onClick$={() => (activeTab.value = "drafts")}
        >
          <DraftIcon />
          Draft
        </button>

        <button
          class={{ "toolbar-btn": true, ghost: true, active: activeTab.value === "downloads" }}
          onClick$={() => (activeTab.value = "downloads")}
        >
          <DownloadIcon />
          Download
        </button>

        <button
          class={{ "toolbar-btn": true, ghost: true, active: activeTab.value === "premium" }}
          onClick$={() => (activeTab.value = "premium")}
        >
          <PremiumIcon />
          Premium
        </button>
      </div>

      {/* RIGHT */}
      <div class="toolbar-right">
        <a href="/app" class="toolbar-btn primary">
          <PlusButtonIcon />
          New Logo
        </a>
      </div>
    </div>
  );
});