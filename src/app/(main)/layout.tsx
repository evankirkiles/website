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
import { PropsWithChildren, Suspense } from 'react';
import { MetaThemeProvider } from 'meta-theme-swap';
import { Metadata } from 'next';
import {
  metaDescription,
  metaOG,
  metaSite,
  metaTitle,
  metaTwitter,
} from '@/app/(main)/metaInfo';
import { GTMAnalytics, VercelAnalytics } from '@/components/Analytics';
import { siteUrl } from '@/env';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <Suspense>
          <GTMAnalytics />
        </Suspense>
      </head>
      <MetaThemeProvider>
        <body className={AkzidenzGrotesk.variable}>
          <Nav>
            <NavContents />
          </Nav>
          {children}
        </body>
      </MetaThemeProvider>
      <VercelAnalytics />
    </html>
  );
}

export const metadata: Metadata = {
  title: metaTitle,
  metadataBase: new URL(siteUrl),
  description: metaDescription,
  authors: { name: 'Evan Kirkiles', url: metaSite },
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
