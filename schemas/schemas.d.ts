/*
 * schemas.d.ts
 * author: evan kirkiles
 * created on Tue Aug 22 2023
 * 2023 the nobot space
 */

import * as s from 'sanity';

declare module 'sanity' {
  interface FieldDefinitionBase {
    codegen?: { required: boolean };
  }
}
