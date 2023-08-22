/*
 * gtm.ts
 * author: evan kirkiles
 * created on Sun Apr 09 2023
 * 2023 the nobot space,
 */

declare const window: Window & { dataLayer: Record<string, unknown>[] };

export const pageview = (url: string) => {
  window.dataLayer?.push({
    event: 'pageview',
    page: url,
  });
};
