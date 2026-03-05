import { component$ } from '@builder.io/qwik';
import './featuresCard.css';

const SpellCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m6 16 6-12 6 12" />
    <path d="M8 12h8" />
    <path d="m16 20 2 2 4-4" />
  </svg>
);

const BookOpenCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-Width="2"
    stroke-Linecap="round"
    stroke-Linejoin="round"
  >
    <path d="M12 21V7" />
    <path d="m16 12 2 2 4-4" />
    <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" />
  </svg>
);

const BrushIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m11 10 3 3" />
    <path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" />
    <path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" />
  </svg>
);

const PaletteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-Width="2"
    stroke-Linecap="round"
    stroke-Linejoin="round"
  >
    <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
  </svg>
);

const DraftingCompassIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-Width="2"
    stroke-Linecap="round"
    stroke-Linejoin="round"
  >
    <path d="m12.99 6.74 1.93 3.44" />
    <path d="M19.136 12a10 10 0 0 1-14.271 0" />
    <path d="m21 21-2.16-3.84" />
    <path d="m3 21 8.02-14.26" />
    <circle cx="12" cy="5" r="2" />
  </svg>
);

const ImageDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-Width="2"
    stroke-Linecap="round"
    stroke-Linejoin="round"
  >
    <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
    <path d="m14 19 3 3v-5.5" />
    <path d="m17 22 3-3" />
    <circle cx="9" cy="9" r="2" />
  </svg>
);

export const FeaturesCard = component$(() => {
  const features = [
    {
      icon: <SpellCheckIcon />,
      title: "Enter Your Brand Details",
      description:
        "Provide your brand name and slogan to get started. This helps us generate logo ideas tailored specifically to your business.",
    },
    {
      icon: <BookOpenCheckIcon />,
      title: "Choose Your Brand Category",
      description:
        "Select the industry or category that best represents your brand to receive relevant and professional design suggestions.",
    },
    {
      icon: <BrushIcon />,
      title: "Select Your Brand Style",
      description:
        "Pick a style that matches your vision — modern, minimal, bold, elegant, and more.",
    },
    {
      icon: <PaletteIcon />,
      title: "Choose Your Brand Colors",
      description:
        "Select the colors that reflect your brand identity and create the right emotional impact.",
    },
    {
      icon: <DraftingCompassIcon />,
      title: "Customize Your Logo",
      description:
        "Edit fonts, layouts, icons, and colors until your logo looks exactly the way you want.",
    },
    {
      icon: <ImageDownIcon />,
      title: "Download Your Logo",
      description:
        "Download your high-resolution logo instantly and start using it across all your platforms.",
    },
  ];

  return (
    <section class="features">
      <div class="features__header">
        <h2 class="features__main-title">
          Create Your Logo in 6 Simple Steps
        </h2>
        <p class="features__main-desc">
          From idea to download, our guided process makes logo design fast,
          easy, and completely beginner-friendly.
        </p>
      </div>

      <div class="features__grid">
        {features.map((feature) => (
          <div class="features__card">
            <div class="features__icon">{feature.icon}</div>
            <h3 class="features__title">{feature.title}</h3>
            <p class="features__desc">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
});