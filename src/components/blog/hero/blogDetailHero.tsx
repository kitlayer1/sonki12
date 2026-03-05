import { component$ } from "@builder.io/qwik";
import "./blogDetailHero.css";

interface BlogHeroProps {
  title: string;
  date: string;
  coverImage: string;
  category: string;
}

export const BlogHero = component$<BlogHeroProps>(
  ({ title, date, coverImage, category }) => {
    return (
      <section class="blog-hero">
        <div class="blog-hero-inner">
          {/* LEFT */}
          <div class="blog-hero-left">
            <div class="blog-breadcrumb">
              {category} <span>›</span> {title}
            </div>

            <h1 class="blog-hero-title">{title}</h1>
            <div class="blog-hero-date">{date}</div>
          </div>

          <div class="blog-hero-right">
            <div class="blog-hero-image-card">
              <img src={coverImage} alt={title} />
            </div>
          </div>
        </div>
      </section>
    );
  },
);
