/*
 * fonts.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */

import localFont from '@next/font/local';

export const AkzidenzGrotesk = localFont({
  variable: '--akzidenz-font',
  src: [
    {
      path: './akzidenz-grotesk/akzidenz-grotesk-roman-webfont.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './akzidenz-grotesk/akzidenz-grotesk-bold-webfont.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './akzidenz-grotesk/akzidenz-grotesk-light-webfont.woff',
      weight: '100',
      style: 'normal',
    },
  ],
});
