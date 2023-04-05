/*
 * _fields.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 the nobot space,
 */

import {defineField} from 'sanity'

export const Title = defineField({
  name: 'title',
  type: 'string',
  title: 'Title',
  description: 'Main title to apply to the entity.',
  validation: (Rule) => Rule.required(),
  codegen: {required: true},
} as SanityCodegenField)

export const Company = defineField({
  name: 'company',
  type: 'string',
  title: 'Company',
  description: 'The company this entity refers to.',
  validation: (Rule) => Rule.required(),
  codegen: {required: true},
} as SanityCodegenField)

export const Cover = defineField({
  name: 'cover',
  type: 'image',
  title: 'Cover Image',
  description: 'Cover image to show for this entity.',
  validation: (Rule) => Rule.required(),
  codegen: { required: true }
} as SanityCodegenField)

export const Slug = defineField({
  name: 'slug',
  type: 'slug',
  title: 'Slug',
  description: 'URL slug to access this resource under.',
  validation: (Rule) => Rule.required(),
  codegen: {required: true},
} as SanityCodegenField)

export const Location = defineField({
  name: 'location',
  type: 'string',
  title: 'Location',
  description: 'Where this entity occurred.',
})

export const StartDate = defineField({
  name: 'startDate',
  type: 'date',
  title: 'Start Date',
  description: 'When did this entity start?',
})

export const EndDate = defineField({
  name: 'endDate',
  type: 'date',
  title: 'End Date',
  description: 'When did this entity end? (if ever)',
})

export const TechStack = defineField({
  type: 'array',
  of: [{type: 'string'}],
  description: 'When did this entity end? (if ever)',
  name: 'techStack',
  title: 'Tech Stack',
})

export const ToolsUsed = defineField({
  type: 'array',
  of: [{type: 'string'}],
  name: 'toolsUsed',
  title: 'Tools Used',
})

export const Description = defineField({
  type: 'array',
  of: [{type: 'block'}],
  description: 'When did this entity end? (if ever)',
  name: 'description',
  title: 'Description',
})
