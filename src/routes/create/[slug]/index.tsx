import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { CategoryBadge } from "~/components/create/badge/categoryBadge";
import { CategoryBanner } from "~/components/create/banner/categoryBanner";
import { CategoryHero } from "~/components/create/hero/categoryHero";
import { CategorySection } from "~/components/create/section/categorySection";
import { CategorySlider } from "~/components/create/slider/categorySlider";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { NotFound } from "~/components/global/notFound/notFound";
import { HomeTestimonial } from "~/components/home/testimonial/testimonial";

interface HeroData {
  badge: string;
  title: string;
  description: string;
  subText: string;
  img: string;
}

interface SectionData {
  badge: string;
  title: string;
  description: string;
  subText: string;
}

interface SliderItem {
  img: string;
}

interface SliderData {
  title: string;
  description: string;
  top: SliderItem[];
}

interface CategoryItem {
  label: string;
  slug: string;
}

interface BannerData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
}

interface PageData {
  hero: HeroData;
  categorySection: SectionData;
  slider?: SliderData;
  categories?: CategoryItem[];
  banner?: BannerData;
  title: string;
  description: string;
  content: string;
}

export const usePageData = routeLoader$<PageData | null>(async ({ url, status }) => {
  try {
    const res = await fetch("http://localhost:5173/data/createDetail.json");
    if (!res.ok) throw new Error('Failed to load page data');
    
    const json = await res.json();
    const slug = url.pathname.split("/").pop()?.toLowerCase();
    
    if (!slug) {
      status(404);
      return null;
    }
    
    const pageData = json.success?.[slug];
    if (!pageData) {
      status(404);
      return null;
    }
    
    return pageData;
  } catch (e) {
    status(404);
    return null;
  }
});

export default component$(() => {
  const page = usePageData();

  if (!page.value) {
    return <NotFound />;
  }

  return (
    <>
      <HomeHeader />
      <CategoryHero
        badge={page.value.hero.badge}
        title={page.value.hero.title}
        description={page.value.hero.description}
        subText={page.value.hero.subText}
        img={page.value.hero.img}
      />

      <CategorySection
        badge={page.value.categorySection.badge}
        title={page.value.categorySection.title}
        description={page.value.categorySection.description}
        subText={page.value.categorySection.subText}
      />

      <HomeTestimonial />

      {page.value.slider && (
        <CategorySlider
          title={page.value.slider.title}
          description={page.value.slider.description}
          topItems={page.value.slider.top}
        />
      )}

    

      {page.value.categories && (
        <CategoryBadge categories={page.value.categories} />
      )}

      {page.value.banner && (
        <CategoryBanner
          title={page.value.banner.title}
          description={page.value.banner.description}
          buttonText={page.value.banner.buttonText}
          buttonLink={page.value.banner.buttonLink}
        />
      )}
    </>
  );
});