/*
 * route.ts
 * author: evan kirkiles
 * created on Mon Aug 14 2023
 * 2023 17o1 Records
 */

import { webhookSecret } from '@/env';
import getClient from '@/lib/sanity.client';
import {
  Design,
  Play,
  Project,
  SanityImageAsset,
  Scopedcopy,
  Work,
} from '@/lib/sanity.schema';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import groq from 'groq';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { Slug } from 'sanity';

function assertIsTyped(
  body: any
): asserts body is
  | SanityImageAsset
  | Scopedcopy
  | Design
  | Play
  | Project
  | Work {
  if (!body._type) throw new Error('Webhook received invalid Sanity document.');
}

/**
 * This function defines a route handler for performing on-demand revalidation
 * for our Sanity assets. For example, it tells Next to regenerate a SitePage
 * when it is updated or created by us in the Sanity desk.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  // first, validate the request signature
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) return NextResponse.json({});
  const isValid = isValidSignature(
    JSON.stringify(body),
    signature,
    webhookSecret
  );
  if (!isValid) {
    return NextResponse.json({ success: false, message: 'Invalid signature.' });
  }

  // if valid request, attempt to do the revalidation
  try {
    assertIsTyped(body);
    let revalidated: string[] = [];
    switch (body._type) {
      case 'sanity.imageAsset': {
        const items = await getClient().fetch<{ slug: { current: string } }[]>(
          groq`
          *[defined(slug) && references($ref)]
        `,
          { ref: body._id }
        );
        items.forEach(({ slug }) => revalidated.push(slug.current));
        break;
      }
      case 'scopedcopy':
        revalidated.push(body.slug);
        break;
      // Validate anythig else with a slug
      default: {
        const slug = (body as any).slug as Slug | undefined;
        if (slug) revalidated.push(slug.current);
        break;
      }
    }

    // Accumulate all the unique paths that need to be revalidated
    const stalePaths = [
      ...new Set(
        revalidated.flatMap((slug) => {
          let prevPath = '';
          return slug.split('/').map((curr) => {
            prevPath += `/${curr}`;
            return prevPath;
          });
        })
      ),
    ];

    // If gallery priority was set, we also need to revalidate the index
    if ((body as any).galleryPriority) {
      stalePaths.push('/');
    }

    // send the revalidation requests
    stalePaths.forEach(revalidatePath);
    return NextResponse.json({
      success: true,
      revalidated_n: stalePaths.length,
      paths: stalePaths,
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
}
