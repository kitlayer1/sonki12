// src/colorOption.ts

export type ColorPalette = {
  background: string;
  text: string;
};

export type ColorOption = {
  id: number;
  displayColor: string;
  title: string;
  description: string;
  image: string;
  palettes: ColorPalette[];
};
export const colorOptions: ColorOption[] = [
  {
    id: 1,
    displayColor: '#C6A75E',
    title: 'Yellow',
    description: 'Prestigious, luxurious, radiant, timeless, sophisticated',
    image: '/images/app/color/yellow.svg',
    palettes: [
      { background: '#FFD700', text: '#442604' },
      { background: '#E6BE8A', text: '#834429' },
      { background: '#D4AF37', text: '#382010' },
      { background: '#C5B358', text: '#5A4229' },
      { background: '#B8860B', text: '#FCF9C5' },
      { background: '#F0E68C', text: '#906118' },
      { background: '#DAA520', text: '#F8F2C9' },
      { background: '#FFDF00', text: '#442804' },
      { background: '#F1C40F', text: '#FDFDE9' },
      { background: '#F9A602', text: '#FFF6C5' },
      { background: '#C99700', text: '#FFFB88' },
      { background: '#BFA124', text: '#F6F4CB' },
      { background: '#A77D00', text: '#F7FF85' },
      { background: '#C9B037', text: '#362512' },
      { background: '#E0C068', text: '#995324' },
      { background: '#F5D27A', text: '#CD6612' },
      { background: '#FFCC00', text: '#74430F' },
      { background: '#E2C779', text: '#7C4324' },
      { background: '#B28F42', text: '#E1D6A7' },
      { background: '#C89B3C', text: '#5D3926' },
      { background: '#A67C00', text: '#E1D6A7' },
    ],
  },
  {
    id: 2,
    displayColor: '#33FF57',
    title: 'Orange',
    description: 'Prestigious, luxurious, radiant, timeless, sophisticated',
    image: '/images/app/color/orange.svg',
    palettes: [
      { background: '#F0FFF4', text: '#00A028' },
      { background: '#D5F5E3', text: '#27AE60' },
      { background: '#E8F8F5', text: '#2ECC71' },
    ],
  },
  {
    id: 3,
    displayColor: '#000000',
    title: 'Black & White',
    description: 'Prestigious, luxurious, radiant, timeless, sophisticated.',
    image: '/images/app/color/black.svg',
    palettes: [
      { background: '#F0F4FF', text: '#0033A0' },
      { background: '#D6E6FF', text: '#2980B9' },
      { background: '#E3F2FD', text: '#3498DB' },
    ],
  },
  {
    id: 4,
    displayColor: '#0B1F3A',
    title: 'Blue',
    description: 'Prestigious, luxurious, radiant, timeless, sophisticated',
    image: '/images/app/color/blue.svg',
    palettes: [
      { background: '#FFFDF0', text: '#B79500' },
      { background: '#FFFACD', text: '#F39C12' },
      { background: '#FFF9C4', text: '#F1C40F' },
    ],
  },
  {
    id: 5,
    displayColor: '#DB2627',
    title: 'Red',
    description: 'Prestigious, luxurious, radiant, timeless, sophisticated',
    image: '/images/app/color/red.svg',
    palettes: [
      { background: '#F5F0FF', text: '#6C3483' },
      { background: '#E8DAEF', text: '#8E44AD' },
      { background: '#EBDEF0', text: '#9B59B6' },
    ],
  },
  {
    id: 6,
    displayColor: '#16A349',
    title: 'Green',
    description: 'Prestigious, luxurious, radiant, timeless, sophisticated',
    image: '/images/app/color/green.svg',
    palettes: [
      { background: '#FFF0F7', text: '#C71585' },
      { background: '#FADDE1', text: '#E91E63' },
      { background: '#FCE4EC', text: '#EC407A' },
    ],
  },
  {
    id: 7,
    displayColor: '#7C3AEC',
    title: 'Purple',
    description: 'Prestigious, luxurious, radiant, timeless, sophisticated',
    image: '/images/app/color/purple.svg',
    palettes: [
      { background: '#FFF0F0', text: '#C0392B' },
      { background: '#FADBD8', text: '#E74C3C' },
      { background: '#F5B7B1', text: '#C0392B' },
    ],
  },
  {
    id: 8,
    displayColor: '#EC4899',
    title: 'Pink',
    description: 'Prestigious, luxurious, radiant, timeless, sophisticated',
    image: '/images/app/color/pink.svg',
    palettes: [
      { background: '#F0FFF9', text: '#16A085' },
      { background: '#D1F2EB', text: '#17A589' },
      { background: '#D0ECE7', text: '#1ABC9C' },
    ],
  },

];

// ID → Option map (hızlı erişim)
export const colorOptionById = Object.fromEntries(
  colorOptions.map(opt => [opt.id, opt])
) as Record<number, ColorOption>;