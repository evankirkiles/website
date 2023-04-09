/*
 * exit-preview.ts
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space,
 */

import { NextApiRequest, NextApiResponse } from 'next';

export default function exit(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.writeHead(307, { Location: '/' });
  res.end();
}
