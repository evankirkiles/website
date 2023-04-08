/*
 * layout.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */

import { AkzidenzGrotesk } from '@/fonts/fonts';
import './globals.scss';
import Nav from '@/components/Nav';
import NavContents from '@/components/Nav/NavContents';
import { PropsWithChildren } from 'react';
import Footer from '@/components/Footer';
import { ScrollThemeColorBody } from '@/contexts/ThemeColorContext';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        {/* <meta id="themecolor" name="theme-color" content="#ffffff" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Evan Kirkiles" />
        <meta name="description" content="Programmer, designer, and artist." />
      </head>
      <body className={AkzidenzGrotesk.variable}>
        {children}
        <Nav>
          {/* @ts-expect-error Server Component */}
          <NavContents />
        </Nav>
        <Footer />
      </body>
      {/* <ScrollThemeColorBody
        className={AkzidenzGrotesk.variable}
        initialColor="#ffffff"
        timeout={300}
      >
      </ScrollThemeColorBody> */}
    </html>
  );
}
