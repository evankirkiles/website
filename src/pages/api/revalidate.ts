/*
 * revalidate.ts
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space,
 */

import client from '@/lib/sanity.client';
import groq from 'groq';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseBody } from 'next-sanity/webhook';
import { Slug } from 'sanity';

// Export the config from next-sanity to enable validating the request body signature properly
export { config } from 'next-sanity/webhook';

/**
 * Revalidates a path on the website using on-demand revalidation.
 *
 * @param req
 * @param res
 * @returns
 */
export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse the body and signature of the Sanity request
    const { isValidSignature, body } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    // Ensure signature is valid
    if (!isValidSignature) {
      const message = 'Invalid signature';
      console.warn(message);
      res.status(401).json({ message });
      return;
    }

    // Gather all slugs to be revalidated
    const slugs = [];
    switch (body._type) {
      // Image assets require updating their references
      case 'sanity.imageAsset':
        const items = await client.fetch<{ slug: { current: string } }[]>(
          groq`
          *[defined(slug) && references($ref)]
        `,
          { ref: body._id }
        );
        items.forEach(({ slug }) => slugs.push(slug));
        break;
      // Validate anythig else with a slug
      default:
        const slug = body.slug as Slug | undefined;
        if (slug) slugs.push(slug.current);
    }

    // Accumulate all the unique paths that need to be revalidated
    const stalePaths = [
      ...new Set(
        slugs.flatMap((slug) => {
          let prevPath = '';
          return slug.split('/').map((curr) => {
            prevPath += `/${curr}`;
            return prevPath;
          });
        })
      ),
    ];

    // And send the revalidation requests
    const revalidates = stalePaths.map((route) => res.revalidate(route));
    await Promise.all(revalidates);
    return res
      .status(200)
      .json({ n_revalidated: stalePaths.length, paths: stalePaths });

    // In case of error, return 500 (will retry next time)
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: (err as { message: string }).message });
  }
}
