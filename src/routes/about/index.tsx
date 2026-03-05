import { component$ } from "@builder.io/qwik";
import { AboutBanner } from "~/components/about/banner/aboutBanner";
import { AboutHero } from "~/components/about/hero/aboutHero";
import { AboutSection } from "~/components/about/section/aboutSection";
import { HomeHeader } from "~/components/global/header/homeHeader";

export default component$(() => {
  return (
    <>
      <HomeHeader />
      <AboutHero
      />


      <AboutSection/>

      
      <AboutBanner
        title="Create Your Brand Identity in Minutes"
        description="Design a professional logo effortlessly. Customize colors, fonts, and icons, then download ready-to-use files for web, social media, and print."
        buttonText="Get Started"
      />
    </>
  );
});
