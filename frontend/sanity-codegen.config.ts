/*
 * sanity-codegen.config.ts
 * author: evan kirkiles
 * created on Tue Apr 04 2023
 * 2023 the nobot space, 
 */

import { SanityCodegenConfig } from 'sanity-codegen';

const config: SanityCodegenConfig = {
  schemaPath: '../studio/schemas',
  outputPath: './src/cms/schema.ts',
  /**
  * We need to parse the sanity imports inside node modules. This ignore
  * pattern only pulls the packages we need to build the schema file
  */
 babelOptions: {
   ignore: [
     function (filepath: string) {
       return /\/node_modules\/(?!@sanity)/.test(filepath)
     }
   ]
 }
}

export default config;