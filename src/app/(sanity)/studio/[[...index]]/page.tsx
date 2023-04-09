/*
 * page.tsx
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space, 
 */
"use client";

import {NextStudio} from 'next-sanity/studio'

import config from '../../../../../sanity.config'

export default function StudioPage() {
  //  Supports the same props as `import {Studio} from 'sanity'`, `config` is required
  return <NextStudio config={config} />
}