/*
 * project.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */

import { SchemaTypeDefinition } from 'sanity';
import * as F from '../_fields';

const Design: SchemaTypeDefinition<'document'> = {
  name: 'design',
  type: 'document',
  title: 'Design',
  fields: [
    F.Title,
    F.Slug,
    F.Cover,
    F.Location,
    F.Description,
    F.StartDate,
    F.EndDate,
    F.TechStack,
    F.ToolsUsed,
    F.GalleryPriority
  ],
};

export default Design;
