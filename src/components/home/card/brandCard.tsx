import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import "./brandCard.css";

interface Category {
  id: number;
  title: string;
  image: string;
  href: string;
}

export const CategoryBrandCard = component$(() => {
  const categories: Category[] = [
    { id: 1, title: "Gaming", image: "/images/home/brand/arcade-machine.png", href: "/create/gaming-brand-maker" },
    { id: 2, title: "Food", image: "/images/home/brand/diet.png", href: "/create/food-brand-maker" },
    { id: 3, title: "Fashion", image: "/images/home/brand/fashion.png", href: "/create/fashion-brand-maker" },
    { id: 4, title: "Beauty", image: "/images/home/brand/beauty.png", href: "/create/beauty-brand-maker" },
    { id: 5, title: "Real Estate", image: "/images/home/brand/real-estate.png", href: "/create/real-estate-brand-maker" },
    { id: 6, title: "Technology", image: "/images/home/brand/technology.png", href: "/create/technology-brand-maker" },
    { id: 7, title: "Sports", image: "/images/home/brand/sports.png", href: "/create/sports-brand-maker" },
    { id: 8, title: "Education", image: "/images/home/brand/education.png", href: "/create/education-brand-maker" },
    { id: 9, title: "Travel", image: "/images/home/brand/travel.png", href: "/create/travel-brand-maker" },
    { id: 10, title: "Commerce", image: "/images/home/brand/shop.png", href: "/create/commerce-brand-maker" },
  ];

  return (
    <section class="category-section">
      <div class="category-grid">
        {categories.map((item) => (
          <Link key={item.id} href={item.href} class="category-card">
            <span class="category-name">{item.title}</span>

            <div class="category-image">
              <img src={item.image} alt={item.title} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
});
