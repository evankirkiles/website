/*
 * revalidate.ts
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space,
 */

import client from '@/lib/sanity.client';
import { SanityDocument } from '@sanity/client';
import groq from 'groq';
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

    // gather all slugs to be revalidated
    const slugs = [];
    if (body._type == 'sanity.imageAsset') {
      const items = await client.fetch<{ slug: { current: string } }[]>(
        groq`
        *[defined(slug) && references($ref)]
      `,
        { ref: body._id }
      );
      items.forEach(({ slug }) => slugs.push(slug));
    } else {
      slugs.push((body.slug as Slug).current);
    }

    // accumulate all the unique paths that need to be revalidated
    const revalidatePaths = new Set(
      slugs.flatMap((slug) => {
        let prevPath = '';
        return slug.split('/').map((curr) => {
          prevPath += `/${curr}`;
          return prevPath;
        });
      })
    );
    const revalidates = [...revalidatePaths].map(() => res.revalidate);
    await Promise.all(revalidates);
    return res.status(200).json({ revalidated: revalidates.length });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: (err as { message: string }).message });
  }
}
