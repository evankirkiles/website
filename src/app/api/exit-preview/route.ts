/*
 * route.ts
 * author: evan kirkiles
 * created on Fri Aug 04 2023
 * 2023 17o1 Records
 */

import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  draftMode().disable();
  redirect(`/`);
}
