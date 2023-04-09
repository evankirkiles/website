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
import { Analytics } from '@vercel/analytics/react';
import {
  metaDescription,
  metaOG,
  metaSite,
  metaTitle,
  metaTwitter,
} from '@/app/(main)/metaInfo';

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
      <Analytics />
    </html>
  );
}

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  authors: { name: 'Evan Kirkiles', url: metaSite },
  themeColor: '#ffffff',
  manifest: '/site.webmanifest',
  viewport: { width: 'device-width', initialScale: 1 },
  openGraph: metaOG,
  twitter: metaTwitter,
  other: { 'msapplication-TileColor': '#da532c' },
  icons: {
    icon: [
      {
        url: '/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  keywords: [
    'programmer',
    'art',
    'design',
    'programming',
    'industry',
    'software',
    'software engineer',
    'evan',
    'kirkiles',
    'intern',
    'developer',
    'computers',
    'computer',
    'science',
    'terraform',
    'typescript',
    'nextjs',
    'react',
    'nextjs 13',
    'c++',
    'javascript',
    'html',
    'css',
  ],
};
