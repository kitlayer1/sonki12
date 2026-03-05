import { component$ } from "@builder.io/qwik";
import Comment from "~/components/global/comment/comment";
import { FAQ } from "~/components/global/faq/faq";
import { Footer } from "~/components/global/footer/footer";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { FeaturesCard } from "~/components/product/card/features/featuresCard";
import { ProductHero } from "~/components/product/hero/productHero";
import { ProductSection } from "~/components/product/section/productSection";

export default component$(() => {

const comments = [
    {
      text: `I don’t have any design background, but I was able to create a clean and professional-looking logo by following the steps. Everything felt clear and easy to use.`,
      name: 'Elissa Piraver',
      title: 'Small Business Owner',
      image: '/images/global/comment/user/woman1.svg',
      bg: '#F4EFE9',
      color: '#020618',
    },
    {
      text: `"Seeing my logo update in real time while adjusting colors and typography made the whole process much more intuitive than I expected."`,
      name: 'Cristian Makalulu',
      title: 'Content Creator',
      image: '/images/global/comment/user/man1.svg',
      bg: '#F4EFE9',
      color: '#020618',
    },
    {
      text: `I explored several styles and variations before choosing the final one, which really helped me understand what works best for my brand."`,
      name: 'Albert Mitrovic',
      title: 'Startup Founder',
      image: '/images/global/comment/user/man2.svg',
      bg: '#F4EFE9',
      color: '#020618',
    },
    {
      text: `"As someone who just wanted a solid logo without learning complex design tools, this platform was exactly what I needed."`,
      name: 'Guillermo Rauch',
      title: 'Freelance Consultant',
      image: '/images/global/comment/user/man3.svg',
      bg: '#F4EFE9',
      color: '#020618',
    },
    {
      text: `"The step-by-step flow made it easy to experiment, make changes, and improve the design without feeling overwhelmed."`,
      name: 'Peter Rashford',
      title: 'E-commerce Store Owner',
      image: '/images/global/comment/user/man4.svg',
      bg: '#F4EFE9',
      color: '#020618',
    },
    {
      text: `"I created a logo in a short time, and it looks good enough to use across my website and social media."`,
      name: 'Sabriana Convelti',
      title: 'Marketing Specialist',
      image: '/images/global/comment/user/woman2.svg',
      bg: '#F4EFE9',
      color: '#020618',
    },
  ];

   const faqs = [
    {
      question: 'Do I need design experience to create a logo?',
      answer: 'No. The logo maker is designed for beginners and guides you through each step, so you can create a professional logo without any design experience.',
    },
    {
      question: 'How long does it take to create a logo?',
      answer: 'Most users can create a logo in just a few minutes. You can take more time to explore different styles and make adjustments if needed.',
    },
    {
      question: 'Can I use my logo for commercial purposes?',
      answer: 'Yes. Logos created with the platform can be used for commercial purposes, including branding, marketing, and promotional materials. Once downloaded, all rights to the logo belong to you, and your design is removed from our system.',
    },
    {
      question: 'What file formats will my logo be provided in?',
      answer: 'Your logo will be delivered in PNG, SVG, and JPG formats, packaged in a ZIP file. Each download includes five different logo variations, making it easy to use your logo across different platforms and use cases.',
    },
    {
      question: 'Can I edit my logo after creating it?',
      answer: 'Yes. You can go back and update colors, typography, and layout at any time before downloading your final logo.',
    },
    {
      question: 'Is this logo maker suitable for small businesses and personal projects?',
      answer: 'Yes. The platform is designed for individuals, creators, and small businesses who want a simple and reliable way to create a professional logo.',
    }
  ];

  return (
    <>
      <HomeHeader />
      <ProductHero
        title="AI-Powered Logo Design for Modern Brands"
        description="Instantly generate unique logo ideas, customize colors and typography, and export professional files ready for web, social media, and print."
        image="/images/product/hero/productHero.svg"
      />

      <FeaturesCard />
       <ProductSection
        badge="Logo Design"
        title="Launch Your Brand with Confidence"
        description="From your initial idea to the final polished design, our platform guides you through every step of creating a stunning logo that truly represents your brand. With intelligent design tools, fully customizable templates, and an intuitive interface, you can craft a professional-quality logo in just minutes. No design experience is needed — simply choose your preferences, refine your style, and download a high-resolution logo ready for web, social media, and print. Fast, affordable, and completely hassle-free, it’s everything you need to launch your brand with confidence."
        image="/images/home/testimonial/testimonial1.jpg"
        imagePosition="right"
      />


      <Comment comments={comments} />;
        <FAQ
            title={`Frequently\nasked\nquestions`}
            faqs={faqs}
          />
<Footer/>
    </>
  );
});