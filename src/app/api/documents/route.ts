import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'BLOB_READ_WRITE_TOKEN not configured' }, { status: 503 });
  }
  try {
    const result = await list({ prefix: 'japan-trip/' });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
