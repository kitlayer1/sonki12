// src/components/allFonts.ts
export interface FontOption {
  id: number;
  styleId: number; // Step5'te seçilen style id
  fontFamily: string;
  previewImg: string;
  displayName: string;
  file: string;
}

export const allFonts: FontOption[] = [
  // ================= CLASSIC (styleId: 1) =================
  {
    id: 1,
    styleId: 1,
    fontFamily: "Neothin",
    displayName: "Neothin",
    previewImg: "/images/app/font/modern.svg",
    file: "/fonts/classic/neothin/neothin.otf",
  },
  {
    id: 2,
    styleId: 1,
    fontFamily: "Quirkysans",
    displayName: "Quirkysans",
    previewImg: "/images/app/font/font1.svg",
    file: "/fonts/classic/quirkysans/quirkysans.otf",
  },
  {
    id: 3,
    styleId: 1,
    fontFamily: "Hidayatullah",
    displayName: "Hidayatullah",
    previewImg: "/images/app/font/font1.svg",
    file: "/fonts/classic/hida/hidayatullah.ttf",
  },

  // ================= RETRO (styleId: 2) =================
  {
    id: 4,
    styleId: 2,
    fontFamily: "RetroFont1",
    displayName: "Retro Style 1",
    previewImg: "/images/app/font/font2.svg",
    file: "/fonts/retro/retro1.otf",
  },
  {
    id: 5,
    styleId: 2,
    fontFamily: "RetroFont2",
    displayName: "Retro Style 2",
    previewImg: "/images/app/font/font2.svg",
    file: "/fonts/retro/retro2.otf",
  },

  // ================= MODERN (styleId: 3) =================
  {
    id: 6,
    styleId: 3,
    fontFamily: "ModernFont1",
    displayName: "Modern Style 1",
    previewImg: "/images/app/font/font3.svg",
    file: "/fonts/modern/modern1.ttf",
  },
  {
    id: 7,
    styleId: 3,
    fontFamily: "ModernFont2",
    displayName: "Modern Style 2",
    previewImg: "/images/app/font/font3.svg",
    file: "/fonts/modern/modern2.ttf",
  },

  // ================= FUNKY (styleId: 4) =================
  {
    id: 8,
    styleId: 4,
    fontFamily: "FunkyFont1",
    displayName: "Funky Style 1",
    previewImg: "/images/app/font/font4.svg",
    file: "/fonts/funky/funky1.otf",
  },
  {
    id: 9,
    styleId: 4,
    fontFamily: "FunkyFont2",
    displayName: "Funky Style 2",
    previewImg: "/images/app/font/font4.svg",
    file: "/fonts/funky/funky2.otf",
  },

  // ================= ELEGANT (styleId: 5) =================
  {
    id: 10,
    styleId: 5,
    fontFamily: "SilvaMarine",
    displayName: "Silva Marine",
    previewImg: "/images/app/font/font5.svg",
    file: "/fonts/elegant/silva-marine/silvaMarine.otf",
  },
  {
    id: 11,
    styleId: 5,
    fontFamily: "ElegantFont2",
    displayName: "Elegant Style 2",
    previewImg: "/images/app/font/font5.svg",
    file: "/fonts/elegant/elegant2.ttf",
  },

  // ================= PLAYFUL (styleId: 6) =================
  {
    id: 12,
    styleId: 6,
    fontFamily: "PlayfulFont1",
    displayName: "Playful Style 1",
    previewImg: "/images/app/font/font6.svg",
    file: "/fonts/playful/playful1.otf",
  },
  {
    id: 13,
    styleId: 6,
    fontFamily: "PlayfulFont2",
    displayName: "Playful Style 2",
    previewImg: "/images/app/font/font6.svg",
    file: "/fonts/playful/playful2.otf",
  },

  // ================= TECH (styleId: 7) =================
  {
    id: 14,
    styleId: 7,
    fontFamily: "Orbitron",
    displayName: "Orbitron",
    previewImg: "/images/app/font/font7.svg",
    file: "/fonts/futuristic/orbitron/orbitron.ttf",
  },
  {
    id: 15,
    styleId: 7,
    fontFamily: "TechFont2",
    displayName: "Tech Style 2",
    previewImg: "/images/app/font/font7.svg",
    file: "/fonts/tech/tech2.ttf",
  },

  // ================= LUXURY (styleId: 8) =================
  {
    id: 16,
    styleId: 8,
    fontFamily: "LuxuryFont1",
    displayName: "Luxury Style 1",
    previewImg: "/images/app/font/font8.svg",
    file: "/fonts/luxury/luxury1.otf",
  },
  {
    id: 17,
    styleId: 8,
    fontFamily: "LuxuryFont2",
    displayName: "Luxury Style 2",
    previewImg: "/images/app/font/font8.svg",
    file: "/fonts/luxury/luxury2.ttf",
  },
];