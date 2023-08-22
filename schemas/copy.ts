/*
 * copy.ts
 * author: evan kirkiles
 * created on Tue Apr 11 2023
 * 2023 the nobot space,
 */

import { defineField, SchemaTypeDefinition } from 'sanity';
import * as F from './_fields';

const Page: SchemaTypeDefinition<'document'> = {
  name: 'scopedcopy',
  type: 'document',
  title: 'ScopedCopy',
  fields: [
    defineField({
      name: 'comment',
      type: 'string',
      title: 'Comment',
      description: 'A hint on what this copy does.',
    }),
    F.Content,
    defineField({
      name: 'slug',
      type: 'string',
      title: 'Scope Slug',
      description: 'The slug where this copy is located.',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({
      name: 'index',
      type: 'number',
      title: 'Index',
      description: 'A number to sort page text copy by.',
    }),
  ],
  orderings: [
    {
      title: 'Page Number',
      name: 'pageNumAsc',
      by: [{ field: 'pageNum', direction: 'asc' }],
    },
  ],
};

export default Page;
