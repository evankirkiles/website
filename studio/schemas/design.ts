/*
 * project.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 the nobot space,
 */

import {SchemaTypeDefinition} from 'sanity'
import * as F from './_fields'

const Design: SchemaTypeDefinition<'document'> = {
  name: 'design',
  type: 'document',
  title: 'Design',
  fields: [F.Title, F.Location, F.StartDate, F.TechStack, F.ToolsUsed],
}

export default Design
