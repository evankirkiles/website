/*
 * page.ts
 * author: evan kirkiles
 * created on Tue Apr 04 2023
 * 2023 evan's personal website,
 */

import { defineField, SchemaTypeDefinition } from 'sanity'
import * as F from './_fields'

const Page: SchemaTypeDefinition<'document'> = {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    F.Title,
    F.Description,
    F.Slug,
    defineField({
      type: 'number',
      name: 'pageNum',
      title: 'Page Number',
      description: 'The number of this page in the website.',
      validation: (Rule) => Rule.required(),
      initialValue: 100,
      codegen: {required: true},
    }  as SanityCodegenField),
    defineField({
      type: 'string',
      name: 'entityType',
      title: 'Entity Type',
      description: 'What type of data is shown on this page?',
      validation: (Rule) => Rule.required(),
      codegen: {required: true},
    }  as SanityCodegenField),
    defineField({
      type: 'string',
      name: 'entityTitle',
      title: 'Entity Title',
      description: 'Label to give the data shown on this page.',
      validation: (Rule) => Rule.required(),
      codegen: {required: true},
    }  as SanityCodegenField),
  ],
  orderings: [
    {
      title: 'Page Number',
      name: 'pageNumAsc',
      by: [
        { field: 'pageNum', direction: 'asc'}
      ]
    }
  ]
}

export default Page;
