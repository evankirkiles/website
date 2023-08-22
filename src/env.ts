/*
 * env.ts
 * author: evan kirkiles
 * created on Tue Aug 22 2023
 * 2023 the nobot space
 */

export const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
export const nodeEnv = process.env.NODE_ENV;
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
export const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const webhookSecret = process.env.SANITY_WEBHOOK_SECRET!;
