/*
 * play.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 the nobot space,
 */

import {SchemaTypeDefinition} from 'sanity'
import * as F from './_fields'

const Play: SchemaTypeDefinition<'document'> = {
  name: 'play',
  type: 'document',
  title: 'Play',
  fields: [F.Title, F.Location, F.StartDate, F.EndDate],
}

export default Play
