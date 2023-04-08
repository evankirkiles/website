/*
 * route.ts
 * author: evan kirkiles
 * created on Sat Apr 08 2023
 * 2023 the nobot space,
 */

import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { NextResponse } from 'next/server';

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return NextResponse.json(
      { success: false, message: 'Invalid signature' },
      { status: 401 }
    );
  }
  const isValid = isValidSignature(
    JSON.stringify(request.body),
    signature,
    SANITY_WEBHOOK_SECRET
  );
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: 'Invalid signature' },
      { status: 401 }
    );
  }
}
