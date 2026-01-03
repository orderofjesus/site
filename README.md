This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Convex account ([sign up here](https://dashboard.convex.dev))
- A Google Cloud project with OAuth 2.0 credentials

### Installation

1. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

2. Set up Convex:

```bash
# Initialize Convex (if not already done)
npx convex dev
```

This will:
- Create a Convex project (if you don't have one)
- Generate the `convex/_generated` folder
- Set up the Convex dashboard

3. Configure environment variables:

Create a `.env.local` file in the root directory:

```env
# Convex Configuration
# Get your Convex URL from: https://dashboard.convex.dev
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Google OAuth Configuration
# Get from: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

4. Set Convex environment variables:

```bash
# Set Google OAuth secret in Convex
npx convex env set GOOGLE_CLIENT_SECRET "your-google-client-secret"
```

Or set it via the [Convex Dashboard](https://dashboard.convex.dev) → Settings → Environment Variables

5. Configure Google OAuth:

- Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- Create OAuth 2.0 Client ID credentials
- Add authorized redirect URIs:
  - `http://localhost:3000/auth/callback` (for development)
  - `https://your-domain.com/auth/callback` (for production)

6. Run the development servers:

```bash
# Terminal 1: Start Next.js dev server
npm run dev

# Terminal 2: Start Convex dev server
npm run convex
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

This project uses [Convex Auth](https://github.com/get-convex/convex-auth) with Google OAuth for authentication.

### Features

- **Google OAuth Sign-In**: Users can sign in with their Google account
- **Protected Routes**: Routes like `/dashboard` and `/profile` require authentication
- **User Profiles**: Users can view and update their profile information
- **Session Management**: Automatic session handling with logout functionality

### Auth Flow

1. User clicks "Sign In" → Redirected to `/sign-in`
2. User clicks "Continue with Google" → Google OAuth flow
3. After authentication → Redirected to `/auth/callback`
4. Callback page → Redirects to `/dashboard` or original destination

### Protected Routes

Wrap any page or component with `AuthGuard` to require authentication:

```tsx
import { AuthGuard } from "@/components/auth-guard";

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div>Protected content</div>
    </AuthGuard>
  );
}
```

### Using Auth in Components

```tsx
import { useAuth } from "@/lib/auth-provider";

export function MyComponent() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please sign in</div>;
  
  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## Project Structure

```
├── app/
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   └── callback/      # OAuth callback handler
│   ├── dashboard/         # Protected dashboard
│   └── profile/           # User profile page
├── components/
│   ├── auth-button.tsx    # Auth UI component
│   └── auth-guard.tsx     # Route protection component
├── convex/
│   ├── auth.config.ts     # Auth configuration
│   ├── schema.ts          # Database schema
│   └── users.ts           # User queries/mutations
└── lib/
    ├── auth-provider.tsx  # Auth context provider
    └── convex-provider.tsx # Convex client provider
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Convex Documentation](https://docs.convex.dev) - learn about Convex backend
- [Convex Auth Documentation](https://github.com/get-convex/convex-auth) - learn about Convex Auth

## Deploy

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy Convex

```bash
npm run convex:deploy
```

Make sure to set production environment variables in the Convex dashboard.
