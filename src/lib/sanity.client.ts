/*
 * client.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
import { createClient, groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { cache } from 'react';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export const clientFetch = cache(client.fetch.bind(client));

export const imageUrl = imageUrlBuilder(client);

export default client;
