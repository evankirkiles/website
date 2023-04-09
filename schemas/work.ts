/*
 * project.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */

import {SchemaTypeDefinition} from 'sanity'
import * as F from './_fields'

const Work: SchemaTypeDefinition<'document'> = {
  name: 'work',
  type: 'document',
  title: 'Work',
  fields: [
    F.Role,
    F.Slug,
    F.Company,
    F.Cover,
    F.Location,
    F.StartDate,
    F.EndDate,
    F.Description,
    F.TechStack,
    F.ToolsUsed,
  ],
}

export default Work
