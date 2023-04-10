/*
 * gtm.ts
 * author: evan kirkiles
 * created on Sun Apr 09 2023
 * 2023 the nobot space, 
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

declare const window: Window & { dataLayer: Record<string, unknown>[]; };

export const pageview = (url: string) => {
  window.dataLayer?.push({
    event: 'pageview',
    page: url
  });
}