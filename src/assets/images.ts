// Centralized image URLs. To use your own assets, replace these URLs with
// `import x from './x.jpg'` after dropping files into src/assets/.
// All current images are from Unsplash CDN (free for commercial use).

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Hero — atmospheric dark barbershop interior
  heroBg: u('1503951914875-452162b0f3f1', 1920),

  // Story — barber at work, classic portrait
  storyPortrait: u('1599351431202-1e0f0137899a', 900),

  // Gallery — varied grooming shots
  gallery: [
    u('1622287162716-f311baa1a2b8', 800),
    u('1622286342621-4bd786c2447c', 800),
    u('1521590832167-7bcbfaa6381f', 800),
    u('1605497788044-5a32c7078486', 800),
    u('1503951914875-452162b0f3f1', 800),
    u('1493256338651-d82f7acb2b38', 800),
  ],

  // Team — barber portraits
  team: [
    u('1500648767791-00dcc994a43e', 700),
    u('1507003211169-0a1dd7228f2d', 700),
    u('1522075469751-3a6694fb2f61', 700),
  ],
};
