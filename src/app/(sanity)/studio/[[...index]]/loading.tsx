/*
 * loading.tsx
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space,
 */
'use client';

import config from '../../../../../sanity.config';
import { NextStudioLoading } from 'next-sanity/studio/loading';

export default function Loading() {
  return <NextStudioLoading config={config} />;
}
