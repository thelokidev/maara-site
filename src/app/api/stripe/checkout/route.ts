
import {NextResponse, NextRequest} from 'next/server';
import {createClient} from '@/lib/supabase/server';
import {stripe} from '@/lib/stripe';
import { getURL } from '@/lib/utils';

export async function POST(req: NextRequest) {
  const { priceId } = await req.json();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {data: profile} = await supabase.from('users').select('stripe_customer_id').eq('id', user.id).single();

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${getURL()}/`,
      cancel_url: `${getURL()}/`,
      customer: profile.stripe_customer_id || undefined,
      customer_update: profile.stripe_customer_id ? { name: 'auto', address: 'auto' } : undefined,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}
