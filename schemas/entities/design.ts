/*
 * project.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */

import {SchemaTypeDefinition} from 'sanity'
import * as F from '../_fields'

const Design: SchemaTypeDefinition<'document'> = {
  name: 'design',
  type: 'document',
  title: 'Design',
  fields: [F.Title, F.Slug, F.Location, F.StartDate, F.Description, F.TechStack, F.ToolsUsed],
}

export default Design
