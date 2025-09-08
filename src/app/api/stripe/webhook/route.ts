
import {NextResponse, NextRequest} from 'next/server';
import {headers} from 'next/headers';
import {stripe} from '@/lib/stripe';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';

async function relevantEventsHandler(event: Stripe.Event) {
  const supabase = createAdminClient();
  switch (event.type) {
    case 'customer.created': {
      const customer = event.data.object as Stripe.Customer;
      const { error } = await supabase
        .from('users')
        .update({ stripe_customer_id: customer.id })
        .eq('email', customer.email);
      if (error) {
        console.error('Error updating user with stripe_customer_id', error);
      }
      break;
    }
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === 'subscription') {
        const subscriptionId = session.subscription;
        const customerId = session.customer;
        const { error } = await supabase
          .from('subscriptions')
          .insert({
            id: subscriptionId,
            user_id: session.client_reference_id, 
            status: 'active',
            stripe_customer_id: customerId,
          });
        if(error){
            console.error('Error inserting subscription', error);
        }
      }
      break;
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const { error } = await supabase
            .from('subscriptions')
            .update({ status: subscription.status })
            .eq('id', subscription.id);
        if(error){
            console.error('Error updating subscription status', error);
        }
        break;
    }
    default:
      // console.log(`Unhandled event type ${event.type}`);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = headers().get('stripe-signature');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
  
  try {
    await relevantEventsHandler(event);
  } catch (error) {
    return new Response(
      'Webhook handler failed. View your nextjs function logs.',
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({ received: true });
}
