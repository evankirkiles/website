/*
 * index.tsx
 * author: evan kirkiles
 * created on Sun Apr 09 2023
 * 2023 the nobot space,
 */
'use client';

import { pageview } from '@/lib/gtm';
import { usePathname, useSearchParams } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { useEffect } from 'react';
import { gtmId, vercelEnv } from '@/env';

export function GTMAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (pathname) pageview(pathname);
  }, [pathname, searchParams]);

  if (vercelEnv !== 'production') {
    return null;
  }

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${gtmId}');
          `,
        }}
      />
    </>
  );
}

export function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => (event.url.startsWith('/studio') ? null : event)}
    />
  );
}
