/*
 * layout.tsx
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */

import { AkzidenzGrotesk } from '@/fonts/fonts';
import '@/app/(main)/globals.scss';
import Nav from '@/components/Nav';
import NavContents from '@/components/Nav/NavContents';
import { PropsWithChildren } from 'react';
import Footer from '@/components/Footer';
import { ScrollThemeColorBody } from '@/contexts/ThemeColorContext';
import { Metadata } from 'next';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <ScrollThemeColorBody
        className={AkzidenzGrotesk.variable}
        initialColor="#ffffff"
        timeout={300}
      >
        {children}
        <Nav>
          {/* @ts-expect-error Server Component */}
          <NavContents />
        </Nav>
        <Footer />
      </ScrollThemeColorBody>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Evan Kirkiles',
  description:
    'Evan Kirkiles is a programmer, artist, and designer in his junior year at Yale University.',
  authors: { name: 'Evan Kirkiles', url: 'https://evankirkil.es' },
  themeColor: '#ffffff',
  viewport: { width: 'device-width', initialScale: 1 },
  keywords: [
    "programmer",
    "art",
    "design",
    "programming",
    "industry",
    "software",
    "software engineer",
    "evan",
    "kirkiles",
    "intern",
    "developer",
    "computers",
    "computer",
    "science",
    "terraform",
    "typescript",
    "nextjs",
    "react",
    "nextjs 13",
    "c++",
    "javascript",
    "html",
    "css"
  ],
  openGraph: {
    type: 'website',
    url: 'https://evankirkil.es',
    siteName: 'Evan Kirkiles',
    title: 'Evan Kirkiles',
    description: 'Evan Kirkiles is a programmer, artist, and designer in his junior year at Yale University.',
    emails:[ "kirkilese@gmail.com", "evan.kirkiles@yale.edu"],
    locale: "en-US",
    images: []
  },
  twitter: {
    title: 'Evan Kirkiles',
    description: 'Evan Kirkiles is a programmer, artist, and designer in his junior year at Yale University.',
    card: 'summary_large_image',
    site: "https://evankirkil.es",
    creator: '@evankirkiles',
  }
};
