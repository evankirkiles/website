/*
 * sanity.config.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's personal website,
 */
import { defineConfig, isDev } from 'sanity';
import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';
import schemaTypes from './schemas';
import { getStartedPlugin } from './plugins/sanity-plugin-tutorial';
import { dataset, projectId } from '@/lib/sanity.client';

const devOnlyPlugins = [getStartedPlugin()];

export default defineConfig({
  name: 'default',
  title: "Evan's Personal Website",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [deskTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],
  schema: {
    types: schemaTypes,
  },
});