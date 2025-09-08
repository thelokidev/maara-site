
import {NextResponse, NextRequest} from 'next/server';
import {createClient} from '@/lib/supabase/server';
import {stripe} from '@/lib/stripe';
import { getURL } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();
    
    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${getURL()}?success=true`,
      cancel_url: `${getURL()}?canceled=true`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ 
      error: 'Error creating checkout session',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
