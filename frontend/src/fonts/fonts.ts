/*
 * fonts.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */

import localFont from 'next/font/local';

export const AkzidenzGrotesk = localFont({
  variable: '--akzidenz-font',
  src: [
    {
      path: './akzidenz-grotesk/Akzidenz-grotesk-roman.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './akzidenz-grotesk/Akzidenz-grotesk-bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './akzidenz-grotesk/Akzidenz-grotesk-light.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './akzidenz-grotesk/Akzidenz-grotesk-black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
});
