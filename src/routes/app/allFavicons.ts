// src/routes/app/components/allFavicons.ts
export interface Favicon {
  id: number;
  category: string;
  styleId: number;
  iconPath: string;
  name: string;
}

export const allFavicons: Favicon[] = [
  // --- Agriculture (styleId: 1-8) ---
  { id: 1, category: 'Agriculture', styleId: 1, iconPath: '/images/app/favicon/agriculture/logo1.svg', name: 'hulu' },
  { id: 2, category: 'Agriculture', styleId: 2, iconPath: '/images/app/favicon/agriculture/logo2.svg', name: 'Amino' },
  { id: 3, category: 'Agriculture', styleId: 3, iconPath: '/images/app/favicon/agriculture/logo3.svg', name: 'AHB' },
  { id: 4, category: 'Agriculture', styleId: 4, iconPath: '/images/app/favicon/agriculture/logo4.svg', name: 'TechKey' },
  { id: 5, category: 'Agriculture', styleId: 5, iconPath: '/images/app/favicon/agriculture/logo5.svg', name: 'DiskPro' },
  { id: 6, category: 'Agriculture', styleId: 6, iconPath: '/images/app/favicon/agriculture/logo6.svg', name: 'Signal' },
  { id: 7, category: 'Agriculture', styleId: 7, iconPath: '/images/app/favicon/agriculture/logo7.svg', name: 'DevTools' },
  { id: 8, category: 'Agriculture', styleId: 8, iconPath: '/images/app/favicon/agriculture/fav8.svg', name: 'Track' },

  // --- Art & Design (styleId: 1-8) ---
  { id: 9, category: 'Art & Design', styleId: 1, iconPath: '/images/app/favicon/art/fav1.svg', name: 'Brush' },
  { id: 10, category: 'Art & Design', styleId: 2, iconPath: '/images/app/favicon/art/fav2.svg', name: 'Palette' },
  { id: 11, category: 'Art & Design', styleId: 3, iconPath: '/images/app/favicon/art/fav3.svg', name: 'Pencil' },
  { id: 12, category: 'Art & Design', styleId: 4, iconPath: '/images/app/favicon/art/fav4.svg', name: 'Easel' },
  { id: 13, category: 'Art & Design', styleId: 5, iconPath: '/images/app/favicon/art/fav5.svg', name: 'Canvas' },
  { id: 14, category: 'Art & Design', styleId: 6, iconPath: '/images/app/favicon/art/fav6.svg', name: 'Paint' },
  { id: 15, category: 'Art & Design', styleId: 7, iconPath: '/images/app/favicon/art/fav7.svg', name: 'Sketch' },
  { id: 16, category: 'Art & Design', styleId: 8, iconPath: '/images/app/favicon/art/fav8.svg', name: 'Draw' },

  // --- Technology (styleId: 1-8) ---
  { id: 17, category: 'Technology', styleId: 1, iconPath: '/images/app/favicon/tech/fav1.svg', name: 'Code' },
  { id: 18, category: 'Technology', styleId: 2, iconPath: '/images/app/favicon/tech/fav2.svg', name: 'Data' },
  { id: 19, category: 'Technology', styleId: 3, iconPath: '/images/app/favicon/tech/fav3.svg', name: 'Cloud' },
  { id: 20, category: 'Technology', styleId: 4, iconPath: '/images/app/favicon/tech/fav4.svg', name: 'AI' },
  { id: 21, category: 'Technology', styleId: 5, iconPath: '/images/app/favicon/tech/fav5.svg', name: 'Robot' },
  { id: 22, category: 'Technology', styleId: 6, iconPath: '/images/app/favicon/tech/fav6.svg', name: 'Chip' },
  { id: 23, category: 'Technology', styleId: 7, iconPath: '/images/app/favicon/tech/fav7.svg', name: 'App' },
  { id: 24, category: 'Technology', styleId: 8, iconPath: '/images/app/favicon/tech/fav8.svg', name: 'Web' },

  // --- Food & Drink (styleId: 1-8) ---
  { id: 25, category: 'Food & Drink', styleId: 1, iconPath: '/images/app/favicon/food/fav1.svg', name: 'Burger' },
  { id: 26, category: 'Food & Drink', styleId: 2, iconPath: '/images/app/favicon/food/fav2.svg', name: 'Pizza' },
  { id: 27, category: 'Food & Drink', styleId: 3, iconPath: '/images/app/favicon/food/fav3.svg', name: 'Hotdog' },
  { id: 28, category: 'Food & Drink', styleId: 4, iconPath: '/images/app/favicon/food/fav4.svg', name: 'Fries' },
  { id: 29, category: 'Food & Drink', styleId: 5, iconPath: '/images/app/favicon/food/fav5.svg', name: 'Taco' },
  { id: 30, category: 'Food & Drink', styleId: 6, iconPath: '/images/app/favicon/food/fav6.svg', name: 'Sushi' },
  { id: 31, category: 'Food & Drink', styleId: 7, iconPath: '/images/app/favicon/food/fav7.svg', name: 'Coffee' },
  { id: 32, category: 'Food & Drink', styleId: 8, iconPath: '/images/app/favicon/food/fav8.svg', name: 'Tea' },
];