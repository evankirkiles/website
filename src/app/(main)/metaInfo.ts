/*
 * metaInfo.ts
 * author: evan kirkiles
 * created on Sun Apr 09 2023
 * 2023 the nobot space,
 */

export const metaTitle = 'Evan Kirkiles';
export const metaSite = process.env.NEXT_PUBLIC_SITE_URL!;
export const metaDescription =
  'Evan Kirkiles is a programmer, artist, and designer in his junior year at Yale University.';

export const metaOG = {
  type: 'website',
  url: metaSite,
  siteName: metaTitle,
  title: metaTitle,
  description: metaDescription,
  emails: ['kirkilese@gmail.com', 'evan.kirkiles@yale.edu'],
  locale: 'en-US',
  images: [],
};

export const metaTwitter = {
  title: metaTitle,
  description: metaDescription,
  card: 'summary_large_image',
  site: metaSite,
  creator: '@evankirkiles',
};
