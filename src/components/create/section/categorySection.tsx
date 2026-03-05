import { component$ } from "@builder.io/qwik";
import "./categorysection.css";

interface Props {
  badge?: string;
  title: string;
  description: string;
  subText?: string;
  className?: string;
}

export const CategorySection = component$<Props>((props) => {
  return (
    <section class={`categorysection ${props.className ?? ""}`}>
      <div class="categorysection-container">
        {props.badge && (
          <div class="categorysection-badge">
            {props.badge}
          </div>
        )}

        <header class="categorysection-header">
          <h2 class="categorysection-title">
            {props.title}
          </h2>
        </header>

        <div class="categorysection-content">
          <p class="categorysection-description">
            {props.description}
          </p>

          {props.subText && (
            <p class="categorysection-subtext">
              {props.subText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
});