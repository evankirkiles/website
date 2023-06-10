/*
 * project.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */

import {SchemaTypeDefinition} from 'sanity'
import * as F from '../_fields'

const Project: SchemaTypeDefinition<'document'> = {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    F.Title,
    F.Slug,
    F.Location,
    F.URL,
    F.Cover,
    F.StartDate,
    F.EndDate,
    F.Description,
    F.TechStack,
    F.ToolsUsed,
    F.GalleryPriority
  ],
}

export default Project
