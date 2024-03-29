/*
 * play.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */

import { SchemaTypeDefinition } from 'sanity';
import * as F from '../_fields';

const Play: SchemaTypeDefinition<'document'> = {
  name: 'play',
  type: 'document',
  title: 'Play',
  fields: [
    F.Title,
    F.Slug,
    F.Cover,
    F.Location,
    F.Description,
    F.StartDate,
    F.EndDate,
    F.GalleryPriority,
  ],
};

export default Play;
