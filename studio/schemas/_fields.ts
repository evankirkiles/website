/*
 * _fields.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 the nobot space,
 */

import {defineField } from 'sanity'

export const Title = defineField({
  name: 'title',
  type: 'string',
  title: 'Title',
  description: 'Main title to apply to the entity.',
  validation: (Rule) => Rule.required(),
})

export const Company = defineField({
  name: 'company',
  type: 'string',
  title: 'Company',
  description: 'The company this entity refers to.',
  validation: (Rule) => Rule.required(),
})

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
});

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