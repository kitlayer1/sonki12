import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import "./blogCard.css";

interface BlogCardProps {
  slug: string;
  title: string;
  coverImage: string;
  date: string;
  category: string;
}

export const BlogCard = component$<BlogCardProps>(
  ({ slug, title, coverImage, date, category }) => {
    return (
      <Link href={`/blog/${slug}`} class="blog-card">
        <article>

          <div class="blog-card-image-wrapper">
            <img
              src={coverImage}
              alt={title}
              class="blog-card-image"
            />
          </div>

          <div class="blog-card-content">
            <span class="blog-card-badge">
              {category}
            </span>

            <h2 class="blog-card-title">
              {title}
            </h2>

            <span class="blog-card-date">
              {date}
            </span>
          </div>

        </article>
      </Link>
    );
  }
);