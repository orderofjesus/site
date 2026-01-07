# Event Registration API Documentation

Complete guide to using the event registration system with Convex.

## 📋 Overview

The event registration system consists of:
- **`convex/events.ts`** - Event data queries
- **`convex/eventRegistrations.ts`** - Registration mutations and queries
- **Authentication** - All registration features require user authentication

## 🔐 Authentication Requirement

All registration mutations and user-specific queries require authentication via Convex Auth:
- Users must be signed in to register, cancel, or view their registrations
- Public queries (like event lists) don't require authentication

---

## 📖 API Reference

### Mutations (Write Operations)

#### `register`
Register the current user for an event.

```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const register = useMutation(api.eventRegistrations.register);

// Usage
await register({
  eventId: "j97h23...", // Required: Convex ID of the event
  ticketType: "general", // Optional: "general" | "earlyBird" | "vip"
  notes: "Bringing a friend", // Optional: Any notes
});
```

**Validations:**
- ✅ User must be authenticated
- ✅ User can't register twice for same event
- ✅ Event must have available capacity
- ✅ Event must exist

**Returns:**
```typescript
{
  success: true,
  registrationId: "k12abc...",
  message: "Successfully registered for event!"
}
```

**Errors:**
- `"You must be signed in to register for events"`
- `"You are already registered for this event"`
- `"Sorry, this event is at full capacity"`
- `"Event not found"`

---

#### `cancel`
Cancel a user's registration.

```typescript
const cancel = useMutation(api.eventRegistrations.cancel);

// Usage
await cancel({
  registrationId: "k12abc..." // Required: ID of the registration to cancel
});
```

**Validations:**
- ✅ User must be authenticated
- ✅ User can only cancel their own registrations
- ✅ Registration must exist
- ✅ Registration can't already be cancelled

**Returns:**
```typescript
{
  success: true,
  message: "Registration cancelled successfully"
}
```

---

#### `updateStatus`
Update registration status (useful for admin/check-in).

```typescript
const updateStatus = useMutation(api.eventRegistrations.updateStatus);

// Usage
await updateStatus({
  registrationId: "k12abc...",
  status: "attended" // "registered" | "cancelled" | "attended" | "no-show"
});
```

---

### Queries (Read Operations)

#### `getUserRegistrations`
Get all registrations for the current user (with event details).

```typescript
const myRegistrations = useQuery(api.eventRegistrations.getUserRegistrations);

// Returns
[
  {
    _id: "k12abc...",
    eventId: "j97h23...",
    userId: "u45xyz...",
    registeredAt: 1704067200000,
    status: "registered",
    ticketType: "general",
    notes: "...",
    event: {
      // Full event object
      title: "Healing Service",
      date: "April 15, 2024",
      // ... all event fields
    }
  },
  // ... more registrations
]
```

---

#### `getActiveRegistrations`
Get only active (non-cancelled) registrations for current user.

```typescript
const activeRegistrations = useQuery(api.eventRegistrations.getActiveRegistrations);

// Same format as getUserRegistrations, but filters out cancelled
```

---

#### `isRegistered`
Check if current user is registered for a specific event.

```typescript
const isRegistered = useQuery(api.eventRegistrations.isRegistered, {
  eventId: eventId
});

// Returns: boolean (true/false)
```

**Usage with conditional queries:**
```typescript
// Skip query if no event selected
const isRegistered = useQuery(
  api.eventRegistrations.isRegistered,
  eventId ? { eventId } : "skip"
);
```

---

#### `getEventRegistration`
Get registration details for current user and specific event.

```typescript
const registration = useQuery(api.eventRegistrations.getEventRegistration, {
  eventId: eventId
});

// Returns registration object or null
```

---

#### `getEventRegistrations`
Get all registrations for a specific event (with user details).

```typescript
const eventRegistrations = useQuery(api.eventRegistrations.getEventRegistrations, {
  eventId: eventId
});

// Returns
[
  {
    _id: "k12abc...",
    eventId: "j97h23...",
    userId: "u45xyz...",
    status: "registered",
    registeredAt: 1704067200000,
    user: {
      name: "John Doe",
      email: "john@example.com",
      image: "https://..."
    }
  },
  // ... more registrations
]
```

---

#### `getEventStats`
Get registration statistics for an event.

```typescript
const stats = useQuery(api.eventRegistrations.getEventStats, {
  eventId: eventId
});

// Returns
{
  totalRegistrations: 45,
  cancelledRegistrations: 5,
  attended: 10,
  maxCapacity: 100,
  availableSpots: 55,
  capacityPercentage: 45,
  isFull: false
}
```

---

## 💡 Common Usage Patterns

### 1. Event Detail Page with Registration

```tsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/lib/auth-provider";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

export default function EventPage({ params }: { params: { id: string } }) {
  const eventId = params.id as Id<"events">;
  const { isAuthenticated } = useAuth();
  
  const event = useQuery(api.events.get, { id: eventId });
  const isRegistered = useQuery(api.eventRegistrations.isRegistered, { eventId });
  const registration = useQuery(api.eventRegistrations.getEventRegistration, { eventId });
  const stats = useQuery(api.eventRegistrations.getEventStats, { eventId });
  
  const register = useMutation(api.eventRegistrations.register);
  const cancel = useMutation(api.eventRegistrations.cancel);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      window.location.href = "auth/login";
      return;
    }
    
    try {
      await register({ eventId, ticketType: "general" });
      alert("Registered successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = async () => {
    if (!registration) return;
    
    try {
      await cancel({ registrationId: registration._id });
      alert("Cancelled successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>{event?.title}</h1>
      <p>Capacity: {stats?.totalRegistrations} / {stats?.maxCapacity}</p>
      
      {isRegistered ? (
        <div>
          <p>✅ You're registered!</p>
          <Button onClick={handleCancel}>Cancel Registration</Button>
        </div>
      ) : (
        <Button 
          onClick={handleRegister}
          disabled={stats?.isFull}
        >
          {stats?.isFull ? "Event Full" : "Register Now"}
        </Button>
      )}
    </div>
  );
}
```

---

### 2. User Dashboard - My Events

```tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthGuard } from "@/components/auth-guard";

function DashboardContent() {
  const registrations = useQuery(api.eventRegistrations.getActiveRegistrations);

  return (
    <div>
      <h1>My Registered Events</h1>
      {registrations?.map((reg) => (
        <div key={reg._id}>
          <h3>{reg.event?.title}</h3>
          <p>{reg.event?.date}</p>
          <span>Status: {reg.status}</span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
```

---

### 3. Event List with Registration Status

```tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/lib/auth-provider";

export default function EventsList() {
  const { isAuthenticated } = useAuth();
  const events = useQuery(api.events.list);
  const myRegistrations = useQuery(
    api.eventRegistrations.getActiveRegistrations
  );

  // Create a Set of registered event IDs for quick lookup
  const registeredEventIds = new Set(
    myRegistrations?.map(r => r.eventId) || []
  );

  return (
    <div>
      {events?.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          {isAuthenticated && registeredEventIds.has(event._id) && (
            <span>✅ Registered</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 🧪 Testing

### Test Page
A complete test page is available at `tmp_rovodev_test_registration.tsx`.

To use it:
1. Create `app/test-registration/page.tsx`
2. Copy the content from `tmp_rovodev_test_registration.tsx`
3. Visit `/test-registration` in your browser
4. Sign in and test all features

### Manual Testing Checklist

- [ ] Register for an event
- [ ] Try registering twice (should fail)
- [ ] View your registrations
- [ ] Cancel a registration
- [ ] Check event stats
- [ ] Try registering for a full event (should fail)
- [ ] Check registration status shows correctly

---

## 🔒 Security Features

✅ **Authentication Required** - All mutations check user authentication
✅ **Ownership Validation** - Users can only cancel their own registrations
✅ **Duplicate Prevention** - Can't register twice for same event
✅ **Capacity Checks** - Prevents over-registration
✅ **Data Integrity** - Registration counts stay in sync with actual registrations

---

## 🚀 Next Steps

Now that registration is set up:

1. **Update Event Pages** - Replace hardcoded data with Convex queries
2. **Add UI Components** - Build registration buttons and status displays
3. **Add Notifications** - Email confirmations (future enhancement)
4. **Add Payments** - Integrate Stripe for paid events (future enhancement)
5. **Admin Dashboard** - View all registrations and check-in users

---

## 📝 Notes

- Registration counts are kept in sync automatically
- All timestamps use `Date.now()` (milliseconds since epoch)
- Query results include full related objects (event details with registrations)
- Status transitions automatically update capacity counts
- All errors throw descriptive messages for easy debugging
