/*
 * client.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website 
 */
import { createClient } from "@sanity/client";

export default createClient({
  projectId: '1jimvdbv',
  dataset: 'production',
  useCdn: true
})