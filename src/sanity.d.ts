/* eslint-disable no-unused-vars */
/*
 * schemas.d.ts
 * author: evan kirkiles
 * created on Fri Aug 04 2023
 * 2023 17o1 Records
 */

import * as s from 'sanity-codegen';

declare module 'sanity-codegen' {
  interface SanityImageAsset {
    altText?: string;
  }

  interface SanityImageMetadata {
    blurHash: string;
  }
}
