import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  return NextResponse.json({ message: 'Upload API is live' });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string || 'invitations';
    const path = formData.get('path') as string;

    if (!file || !path) {
      return NextResponse.json({ error: 'File and path are required' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, Buffer.from(buffer), {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('API Upload Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(path);

    return NextResponse.json({ url: publicUrl });
  } catch (err: any) {
    console.error('API catch error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
