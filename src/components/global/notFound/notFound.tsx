import { component$ } from "@builder.io/qwik";
import { HomeHeader } from "~/components/global/header/homeHeader";
import "./notFound.css";

interface NotFoundProps {
  showHeader?: boolean; // Header gösterilsin mi? Varsayılan: true
  customMessage?: string; // Özel mesaj
}

export const NotFound = component$((props: NotFoundProps) => {
  const { showHeader = true, customMessage } = props;

  return (
    <>
      {showHeader && <HomeHeader />}
      <div class="not-found">
        <div class="not-found-container">
          <h1 class="not-found-title">404</h1>
          <h2 class="not-found-subtitle">Page not found</h2>
          <p class="not-found-text">
            {customMessage || "The page you're looking for doesn't exist or has been moved."}
          </p>
          <a href="/" class="not-found-button">
            Go home
          </a>
        </div>
      </div>
    </>
  );
});