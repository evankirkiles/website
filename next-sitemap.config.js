/*
 * next-sitemap.config.ts
 * author: evan kirkiles
 * created on Sun Apr 09 2023
 * 2023 the nobot space, 
 */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/studio']
}