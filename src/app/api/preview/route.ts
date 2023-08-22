/*
 * route.ts
 * author: evan kirkiles
 * created on Fri Aug 04 2023
 * 2023 17o1 Records
 */

import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const redir = url.searchParams.get('redirect');
  draftMode().enable();
  redirect(redir || '/');
}
