# Dashboard Implementation

This document describes the newly implemented dashboard feature for the Melchizedek application.

## Overview

The dashboard provides users with a centralized view of their activities, including:
- Event registrations
- School enrollments (Mystical Masterclass, Open Scroll)
- Mentorship programs (One-on-One, Elijah Network)

## Features

### 1. Dashboard Overview
- Quick stats showing active enrollments and upcoming events
- Visual cards for each category (Events, Schools, Mentorship)
- Quick actions to browse and join programs

### 2. My Events
- View all registered events with full details
- Cancel registrations
- See event status (registered, attended, cancelled)
- Display event images, dates, times, and locations

### 3. My Schools
- Track school enrollments
- View progress bars for active courses
- See enrollment dates and status
- Links to continue learning

### 4. My Mentorship
- View active mentorship programs
- See mentor information
- Track program status (active, on-hold, completed)
- Easy access to program details

## Database Schema

### New Tables Added to Convex Schema

#### `userProfiles`
- `email`: User's email address
- `firstName`, `lastName`: User's name
- `phone`: Contact number
- `profilePictureUrl`: Profile picture URL
- `createdAt`, `updatedAt`: Timestamps

#### `schoolEnrollments`
- `userEmail`: User's email
- `schoolName`: Name of school (e.g., "Mystical Masterclass", "Open Scroll")
- `enrolledAt`: Enrollment timestamp
- `status`: "active", "completed", or "cancelled"
- `progress`: Optional progress percentage (0-100)
- `notes`: Optional notes

#### `mentorshipEnrollments`
- `userEmail`: User's email
- `programType`: "one-on-one" or "elijah-network"
- `enrolledAt`: Enrollment timestamp
- `status`: "active", "completed", "on-hold", or "cancelled"
- `mentorEmail`: Optional mentor's email
- `startDate`: Optional start date
- `notes`: Optional notes

## Files Created

### Convex Backend
- `convex/dashboard.ts` - Dashboard queries
- `convex/seed_dashboard.ts` - Helper mutations for enrolling users

### Components
- `components/dashboard-sidebar.tsx` - Sidebar navigation
- `components/dashboard-overview.tsx` - Overview page
- `components/dashboard-events.tsx` - Events management
- `components/dashboard-schools.tsx` - Schools tracking
- `components/dashboard-mentorships.tsx` - Mentorship programs
- `components/ui/badge.tsx` - Badge component for status indicators

### Pages
- `app/dashboard/page.tsx` - Main dashboard page

## Usage

### Accessing the Dashboard
Users can access the dashboard from:
1. The main header navigation (Desktop)
2. The mobile menu (Mobile)
3. Direct URL: `/dashboard`

The dashboard is protected by authentication - users must be signed in to access it.

### Populating Test Data

To test the dashboard with sample data, use the mutations in `convex/seed_dashboard.ts`:

#### Enroll in a School
```typescript
// From Convex dashboard or your app
await enrollInSchool({
  userEmail: "user@example.com",
  schoolName: "Mystical Masterclass",
  progress: 35,
  notes: "Making good progress"
});
```

#### Enroll in Mentorship
```typescript
await enrollInMentorship({
  userEmail: "user@example.com",
  programType: "one-on-one",
  mentorEmail: "mentor@example.com",
  startDate: "2024-01-15",
  notes: "Weekly sessions on Tuesdays"
});
```

## Authentication

The dashboard uses WorkOS AuthKit for authentication:
- Users must be signed in to access the dashboard
- User information is pulled from the WorkOS user object
- Email is used as the primary identifier for tracking enrollments

## Styling

The dashboard uses:
- **shadcn/ui** components for consistent UI
- **Tailwind CSS** for styling
- **Lucide Icons** for iconography
- Dark mode support throughout

## Integration Points

### Event Registration
- Events page already has registration functionality
- Dashboard displays registered events automatically
- Users can cancel registrations from the dashboard

### Schools & Mentorship
- Currently displays enrollment data
- Integration with actual enrollment flows can be added to:
  - `/mentorship/one-on-one`
  - `/mentorship/elijah-network`
  - School pages (when created)

## Future Enhancements

Potential improvements:
1. **Progress Tracking**: Add lesson completion tracking for schools
2. **Notifications**: Alert users about upcoming events or mentorship sessions
3. **Calendar View**: Visual calendar for all activities
4. **Analytics**: Track user engagement and progress
5. **Resource Library**: Access to course materials and recordings
6. **Direct Messaging**: Communication with mentors
7. **Certificates**: Generate completion certificates
8. **Payment Integration**: Track payment status for paid programs

## Design Inspiration

The dashboard sidebar was inspired by `mobile-menu.tsx`, maintaining consistent:
- Navigation patterns
- Color schemes
- Component structure
- User experience

## Support

For issues or questions about the dashboard:
1. Check Convex logs for backend errors
2. Verify authentication is working correctly
3. Ensure schema migrations have completed
4. Check that required data exists in the database
