import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const feedbackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  category: z.enum(['bug', 'idea', 'question', 'other']).default('other'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const payload = {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      category: parsed.data.category,
      user_id: user?.id ?? null,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('feedback').insert(payload);
    if (error) {
      return NextResponse.json({ error: 'Failed to save feedback', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Invalid request', details: err?.message ?? 'Unknown error' }, { status: 400 });
  }
}


