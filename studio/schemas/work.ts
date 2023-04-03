/*
 * project.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 the nobot space,
 */

import {SchemaTypeDefinition} from 'sanity'
import * as F from './_fields'

const Work: SchemaTypeDefinition<'document'> = {
  name: 'work',
  type: 'document',
  title: 'Work',
  fields: [F.Title, F.Company, F.Location, F.StartDate, F.EndDate, F.TechStack, F.ToolsUsed],
}

export default Work
