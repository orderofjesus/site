# Events Database Seeding Guide

This guide will help you seed your demo events data into Convex.

## 📋 What's Been Created

1. **`convex/schema.ts`** - Updated with `events` and `eventRegistrations` tables
2. **`convex/events.ts`** - Contains all event queries and the seed mutation
3. **`tmp_rovodev_seed_events.ts`** - Optional script to run the seed from command line

## 🚀 How to Seed Events

### Method 1: Using Convex Dashboard (Recommended)

This is the easiest and most reliable method:

1. **Start Convex Dev Server** (if not already running):
   ```bash
   npx convex dev
   ```

2. **Open Convex Dashboard**:
   - The URL will be displayed in your terminal (usually `https://dashboard.convex.dev`)
   - Or visit: https://dashboard.convex.dev

3. **Navigate to Functions**:
   - Click on the "Functions" tab in the left sidebar
   - Find `events:seedEvents` in the list

4. **Run the Seed Mutation**:
   - Click on `events:seedEvents`
   - Click the "Run" button (no arguments needed)
   - You should see a success message with event IDs

5. **Verify**:
   - Go to the "Data" tab
   - Click on the `events` table
   - You should see 6 events loaded!

### Method 2: Using the Script

If you prefer command line:

1. **Install tsx** (if not already installed):
   ```bash
   npm install -D tsx
   # or
   pnpm add -D tsx
   ```

2. **Run the script**:
   ```bash
   npx tsx tmp_rovodev_seed_events.ts
   ```

3. **Check the output** for success message

## 📊 What Gets Seeded

The seed creates 6 demo events:

1. **Healing Service** - Free healing service event
2. **Elijah Conference 2024** - 3-day conference with pricing tiers
3. **Healing Revival Night** - Extended healing service
4. **Prophetic Encounter** - Intimate prophetic gathering
5. **Summer Healing Crusade** - Large outdoor crusade
6. **Prophetic Worship Night** - Worship-focused event

Each event includes:
- Basic info (title, date, time, location)
- Pricing details
- Schedule
- What to expect
- What to bring
- Registration capacity tracking

## 🔄 Re-seeding

If you need to re-seed (e.g., you made changes):

1. **Delete existing events** using Convex Dashboard:
   - Navigate to Functions
   - Run `events:deleteAllEvents` mutation
   
2. **Run the seed again** using either method above

## 🧪 Testing the Seed

After seeding, test that it works:

```typescript
// In your app component or a test page
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function TestEvents() {
  const events = useQuery(api.events.list);
  
  console.log("Events:", events);
  // Should log 6 events
  
  return <div>Check console for events</div>;
}
```

## 📝 Available Queries

After seeding, you can use these queries:

```typescript
// Get all events
const events = useQuery(api.events.list);

// Get single event
const event = useQuery(api.events.get, { id: eventId });

// Get events by category
const healingEvents = useQuery(api.events.getByCategory, { 
  category: "Healing" 
});

const conferenceEvents = useQuery(api.events.getByCategory, { 
  category: "Conference" 
});
```

## ⚠️ Troubleshooting

**Error: "Events already seeded"**
- Run `events:deleteAllEvents` first, then seed again

**Error: "Table not found"**
- Make sure `npx convex dev` is running
- Check that schema.ts has been deployed

**Error: "NEXT_PUBLIC_CONVEX_URL not found"** (script only)
- Make sure you have a `.env.local` file
- Add your Convex URL from the dashboard

## 🎯 Next Steps

After seeding:

1. ✅ Events are in the database
2. ✅ Schema is set up for registrations
3. 📝 Next: Implement event registration mutations (see `convex/eventRegistrations.ts` - to be created)
4. 🎨 Next: Update your event pages to use Convex data instead of hardcoded data

## 🗑️ Cleanup

The seed script (`tmp_rovodev_seed_events.ts`) is temporary and can be deleted after successful seeding.
