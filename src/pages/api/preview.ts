/*
 * preview.ts
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space,
 */

import { NextApiRequest, NextApiResponse } from 'next';

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  res.setPreviewData({});
  res.writeHead(307, { Location: '/' });
  res.end();
}
