/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fixed Stripe Products Setup Script
 * Run this script to set up all Stripe products for your subscription system
 *
 * Usage: npx tsx scripts/setup-stripe-products-fixed.ts
 */

import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

// Import Stripe after loading env vars
import Stripe from "stripe";

console.log("webhook secret: ", process.env.CONVEX_DEPLOYMENT);

// Validate environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY not found in environment variables");
  console.log("Please add STRIPE_SECRET_KEY to your .env.local file");
  process.exit(1);
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover",
});

interface ProductConfig {
  name: string;
  description: string;
  metadata: Record<string, string>;
  monthlyPrice: number; // in cents
  yearlyPrice: number; // in cents
}

const products: Record<string, ProductConfig> = {
  "all-access": {
    name: "All-Access Spiritual Learning",
    description:
      "Complete access to all spiritual content including Mystical Masterclass, Open Scroll, and exclusive subscriber-only material",
    metadata: {
      planType: "all-access",
      schools: "mystical-masterclass,open-scroll,general",
      features: "full-access,live-qa,priority-support,downloads",
    },
    monthlyPrice: 15000, // $150.00
    yearlyPrice: 144000, // $1,440.00 (20% discount)
  },
  "mystical-masterclass": {
    name: "Mystical Masterclass",
    description:
      "Deep spiritual teachings and mystical practices for transformative growth",
    metadata: {
      planType: "mystical-masterclass",
      schools: "mystical-masterclass,general",
      features: "school-access,monthly-releases,downloads,community",
    },
    monthlyPrice: 7500, // $75.00
    yearlyPrice: 72000, // $720.00 (20% discount)
  },
  "open-scroll": {
    name: "Open Scroll",
    description: "Prophetic insights and revelations for spiritual discernment",
    metadata: {
      planType: "open-scroll",
      schools: "open-scroll,general",
      features: "school-access,monthly-releases,downloads,community",
    },
    monthlyPrice: 7500, // $75.00
    yearlyPrice: 72000, // $720.00 (20% discount)
  },
};

async function createProduct(productKey: string, config: ProductConfig) {
  console.log(`Creating product: ${config.name}...`);

  try {
    // Create the product
    const product = await stripe.products.create({
      name: config.name,
      description: config.description,
      metadata: {
        ...config.metadata,
        productKey,
      },
    });

    console.log(`✅ Product created: ${product.id}`);

    // Create monthly price
    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: config.monthlyPrice,
      currency: "usd",
      recurring: {
        interval: "month",
        trial_period_days: 7, // 7-day free trial
      },
      metadata: {
        planType: config.metadata.planType,
        billingCycle: "monthly",
        productKey,
      },
    });

    console.log(
      `✅ Monthly price created: ${monthlyPrice.id} ($${config.monthlyPrice / 100})`,
    );

    // Create yearly price
    const yearlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: config.yearlyPrice,
      currency: "usd",
      recurring: {
        interval: "year",
        trial_period_days: 7, // 7-day free trial
      },
      metadata: {
        planType: config.metadata.planType,
        billingCycle: "yearly",
        productKey,
      },
    });

    console.log(
      `✅ Yearly price created: ${yearlyPrice.id} ($${config.yearlyPrice / 100})`,
    );

    return {
      product,
      prices: {
        monthly: monthlyPrice,
        yearly: yearlyPrice,
      },
    };
  } catch (error) {
    console.error(`❌ Error creating product ${config.name}:`, error);
    throw error;
  }
}

async function main() {
  console.log(
    "🚀 Setting up Stripe products for Melchizedek Order of Jesus...\n",
  );

  // Test Stripe connection
  try {
    console.log("Testing Stripe connection...");
    const account = await stripe.accounts.retrieve();
    console.log(
      `✅ Connected to Stripe account: ${account.business_profile?.name || account.id}\n`,
    );
  } catch (error: any) {
    console.error("❌ Failed to connect to Stripe:");
    console.error("Error:", error.message);
    console.error("\n🔧 Troubleshooting:");
    console.error("1. Check that STRIPE_SECRET_KEY is set in .env.local");
    console.error("2. Make sure the key starts with sk_test_ or sk_live_");
    console.error(
      "3. Verify the key is copied correctly from Stripe Dashboard",
    );
    process.exit(1);
  }

  const results: Record<string, any> = {};

  // Create all products and prices
  for (const [productKey, config] of Object.entries(products)) {
    try {
      results[productKey] = await createProduct(productKey, config);
      console.log(""); // Add spacing between products
    } catch (error) {
      console.error(`Failed to create product ${productKey}, continuing...`);
      console.error(error);
    }
  }

  // Generate environment variables
  console.log("\n🔧 Environment Variables to Add to .env.local:");
  console.log("=====================================================");

  for (const [productKey, data] of Object.entries(results)) {
    if (!data || !data.prices) continue;

    const upperKey = productKey.toUpperCase().replace("-", "_");
    console.log(
      `NEXT_PUBLIC_STRIPE_${upperKey}_MONTHLY_PRICE_ID=${data.prices.monthly.id}`,
    );
    console.log(
      `NEXT_PUBLIC_STRIPE_${upperKey}_YEARLY_PRICE_ID=${data.prices.yearly.id}`,
    );
  }

  console.log("\n✅ Stripe setup complete!");
  console.log("\nNext steps:");
  console.log(
    "1. Copy the environment variables above to your .env.local file",
  );
  console.log("2. Restart your development server: npm run dev");
  console.log("3. Set up webhooks in Stripe Dashboard");
  console.log("4. Test the subscription flows");
}

// Run the script
main().catch((error) => {
  console.error("\n💥 Script failed:", error.message);
  console.error("\n🔧 Common fixes:");
  console.error("1. Check your STRIPE_SECRET_KEY in .env.local");
  console.error("2. Make sure you have internet connection");
  console.error("3. Verify your Stripe account is activated");
  process.exit(1);
});
