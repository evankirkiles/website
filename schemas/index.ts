/*
 * index.ts
 * author: evan kirkiles
 * created on Mon Apr 03 2023
 * 2023 evan's website
 */
import Design from './entities/design'
import Copy from './copy';
import Page from './page'
import Play from './entities/play'
import Project from './entities/project'
import Work from './entities/work'

const schemas =  [Page, Copy, Project, Work, Design, Play];

export default schemas;
