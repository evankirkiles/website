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
  Page,
  Play,
  Project,
  SanityImageAsset,
  Scopedcopy,
  Work,
} from '@/lib/sanity.schema';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import groq from 'groq';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

function assertIsTyped(
  body: any
): asserts body is
  | SanityImageAsset
  | Scopedcopy
  | Page
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
        revalidated.push(`page:${body.slug}`);
        break;
      // Validate anythig else with a slug
      default: {
        const { slug } = body;
        if (slug) revalidated.push(`page:${slug.current}`);
        break;
      }
    }

    // If gallery priority was set, we also need to revalidate the index
    if ((body as any).galleryPriority) {
      revalidated.push('page:/');
    }

    // send the revalidation requests
    revalidated.forEach(revalidateTag);
    return NextResponse.json({
      success: true,
      revalidated_n: revalidated.length,
      paths: revalidated,
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
}
