/*
 * helpers.ts
 * author: evan kirkiles
 * created on Wed Apr 05 2023
 * 2023 the nobot space,
 */

import * as Schema from '@/lib/sanity.schema';

export type SchemaEntity =
  | Schema.Design
  | Schema.Work
  | Schema.Play
  | Schema.Project;
