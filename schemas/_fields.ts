/*
 * _fields.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */

import { defineField } from 'sanity';

export const Title = defineField({
  name: 'title',
  type: 'string',
  title: 'Title',
  description: 'Main title to apply to the entity.',
  validation: (Rule) => Rule.required(),
  codegen: { required: true },
});

export const Role = defineField({
  name: 'role',
  type: 'string',
  title: 'Role',
  description: 'The role this entity refers to.',
  validation: (Rule) => Rule.required(),
  codegen: { required: true },
});

export const Company = defineField({
  name: 'company',
  type: 'string',
  title: 'Company',
  description: 'The company this entity refers to.',
  validation: (Rule) => Rule.required(),
  codegen: { required: true },
});

export const Cover = defineField({
  name: 'cover',
  type: 'image',
  title: 'Cover Image',
  description: 'Cover image to show for this entity.',
  validation: (Rule) => Rule.required(),
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'A caption for the image, also to be used as alt text.',
    },
  ],
  codegen: { required: true },
  options: {
    metadata: ['lqip'],
  },
});

export const Slug = defineField({
  name: 'slug',
  type: 'slug',
  title: 'Slug',
  description: 'URL slug to access this resource under.',
  validation: (Rule) => Rule.required(),
  codegen: { required: true },
});

export const Location = defineField({
  name: 'location',
  type: 'string',
  title: 'Location',
  description: 'Where this entity occurred.',
});

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
});

export const TechStack = defineField({
  type: 'array',
  of: [{ type: 'string' }],
  description: 'When did this entity end? (if ever)',
  name: 'techStack',
  title: 'Tech Stack',
});

export const ToolsUsed = defineField({
  type: 'array',
  of: [{ type: 'string' }],
  name: 'toolsUsed',
  title: 'Tools Used',
});

export const Description = defineField({
  type: 'array',
  of: [{ type: 'block' }],
  description: 'Describe this entity.',
  name: 'description',
  title: 'Description',
});

export const Content = defineField({
  type: 'array',
  of: [{ type: 'block' }],
  description: 'The contents of this block.',
  name: 'content',
  title: 'Content',
  validation: (Rule) => Rule.required(),
  codegen: { required: true },
});

export const GalleryPriority = defineField({
  type: 'number',
  description:
    'Priority of this entity in the gallery (lower is first, undefined for none).',
  name: 'galleryPriority',
  title: 'Gallery Priority',
});

export const URL = defineField({
  type: 'url',
  description: 'A link to view this project in your browser.',
  name: 'url',
  title: 'URL',
});
