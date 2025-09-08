# Stripe Price IDs Update Guide

After creating your products in Stripe Dashboard, update these Price IDs in `src/components/pricing.tsx`:

## Current placeholder IDs to replace:

```typescript
const plans = [
  {
    name: "Free Trial",
    priceId: null, // Keep as null for free trial
    // ...
  },
  {
    name: "Professional",
    priceId: "price_1PQ1RORsbpWw6p7F5QeAYmMM", // REPLACE WITH YOUR ACTUAL PRICE ID
    // ...
  },
  {
    name: "Team Plan",
    priceId: "price_1PQ1RjRsbpWw6p7FArS74g9S", // REPLACE WITH YOUR ACTUAL PRICE ID
    // ...
  },
  {
    name: "Enterprise",
    priceId: "price_1PQ1SLRsbpWw6p7Fm2p6lTqC", // REPLACE WITH YOUR ACTUAL PRICE ID
    // ...
  },
];
```

## Steps:
1. Create products in Stripe Dashboard
2. Copy the Price IDs (they start with `price_`)
3. Replace the placeholder IDs in the pricing component
4. Test payments in test mode first
