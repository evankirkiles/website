/*
 * project.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 the nobot space,
 */

import {SchemaTypeDefinition} from 'sanity'
import * as F from './_fields'

const Project: SchemaTypeDefinition<'document'> = {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [F.Title, 
    F.Slug, F.Location, F.Cover, F.StartDate, F.EndDate, F.TechStack, F.ToolsUsed],
}

export default Project
