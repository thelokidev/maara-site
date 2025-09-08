
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { loadStripe } from '@stripe/stripe-js';

const plans = [
  {
    name: "Free Trial",
    priceId: null,
    price: "$0",
    period: "trial",
    description: "Test the undetectable experience.",
    features: [
      "10 minutes of stealth browsing",
      "Ctrl+Shift+\\ shortcut",
      "Basic screen share invisibility",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    priceId: "price_1PQ1RORsbpWw6p7F5QeAYmMM", // Replace with your actual price ID
    price: "$6.99",
    period: "/month",
    description: "Perfect for meeting professionals.",
    features: [
      "Unlimited stealth browsing",
      "Otter.ai integration optimized",
      "Invisible during screen shares",
      "Instant Ctrl+Shift+\\ toggle",
      "Meeting transcription ready",
      "Priority support",
    ],
    cta: "Go Professional",
    popular: true,
  },
  {
    name: "Team Plan",
    priceId: "price_1PQ1RjRsbpWw6p7FArS74g9S", // Replace with your actual price ID
    price: "$19.99",
    period: "/3 months",
    description: "For teams who need discretion.",
    features: [
      "Everything in Professional",
      "Multi-device support",
      "Team license management",
      "Bulk deployment tools",
    ],
    cta: "Choose Team Plan",
    popular: false,
  },
  {
    name: "Enterprise",
    priceId: "price_1PQ1SLRsbpWw6p7Fm2p6lTqC", // Replace with your actual price ID
    price: "$35.99",
    period: "/6 months",
    description: "Maximum stealth with premium support.",
    features: [
      "Everything in Team Plan",
      "Custom keyboard shortcuts",
      "Advanced meeting integrations",
      "White-label options",
      "Dedicated support channel",
    ],
    cta: "Go Enterprise",
    popular: false,
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string>("Professional");
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCtaClick = async (planName: string) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/signup');
      return;
    }

    const plan = plans.find(p => p.name === planName);
    if (!plan || !plan.priceId) {
        if (plan?.name === "Free"){
            router.push('/signup');
        } else {
             toast({
                title: "Error",
                description: "This plan is not available for purchase.",
                variant: "destructive",
            });
        }
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: plan.priceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) throw new Error("Stripe.js not loaded");

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(`Stripe error: ${error.message}`);
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Could not proceed to checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold">Choose Your Stealth Level</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          From basic invisibility to enterprise-grade meeting stealth. Start with our free trial.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={cn(
                'flex flex-col text-left cursor-pointer h-full', 
                selectedPlan === plan.name ? 'border-primary ring-2 ring-primary shadow-lg' : '',
                plan.popular && !selectedPlan ? 'border-primary ring-2 ring-primary shadow-lg' : ''
              )}
              onClick={() => setSelectedPlan(plan.name)}
            >
              <CardHeader className="pb-4">
                <CardTitle>{plan.name}</CardTitle>
                 <div>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="pt-2 min-h-[40px]">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={selectedPlan === plan.name || (plan.popular && !selectedPlan) ? 'default' : 'outline'}
                    onClick={() => handleCtaClick(plan.name)}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : plan.cta}
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
