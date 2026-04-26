import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const result = await list({ prefix: 'japan-trip/' });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ blobs: [] }, { status: 200 });
  }
}
