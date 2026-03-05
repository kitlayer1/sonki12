import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import fs from "fs";
import path from "path";
import { BlogCard } from "~/components/blog/blogCard/blogCard";
import { HomeHeader } from "~/components/global/header/homeHeader";

export const useBlogData = routeLoader$(async () => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "blogDetail.json",
  );
  const file = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(file);
});

export default component$(() => {
  const blogData = useBlogData();

  return (
    <>
      <HomeHeader />

      <div class="blog-wrapper">
        <div class="blog-grid">
          {blogData.value?.map((post: any) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.displayDate}
              category={post.category}
            />
          ))}
        </div>
      </div>
    </>
  );
});
