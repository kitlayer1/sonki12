import { component$ } from "@builder.io/qwik";
import "./categoryBadge.css";

interface Props {
  categories: { label: string; slug: string }[];
}

export const CategoryBadge = component$<Props>(({ categories }) => {
  return (
    <div class="category-badge-wrapper">
      {categories.map((item) => (
        <a
          key={item.slug}
          href={`/create/${item.slug}`}
          class="category-badge-item"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
});

