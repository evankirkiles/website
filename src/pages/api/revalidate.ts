/*
 * revalidate.ts
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space,
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { parseBody } from 'next-sanity/webhook';
import { Slug } from 'sanity';

// Export the config from next-sanity to enable validating the request body signature properly
export { config } from 'next-sanity/webhook';

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { isValidSignature, body } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';
      console.warn(message);
      res.status(401).json({ message });
      return;
    }

    const elements = (body.slug as Slug).current.split('/');
    let prevPath = "";
    const revalidates = elements.map((curr) => {
      prevPath += `/${curr}`;
      return res.revalidate(prevPath);
    });
    await Promise.all(revalidates);
    return res.status(200).json({ revalidated: revalidates.length });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: (err as { message: string }).message });
  }
}
