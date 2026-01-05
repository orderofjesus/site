import { redirect } from "next/navigation";
import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import { NextRequest } from "next/server";
import { createSignedState } from "@/lib/oauthstate";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const redirectUri =
    searchParams.get("returnTo") == null ? "/" : searchParams.get("returnTo");

  const state = createSignedState(
    redirectUri as string,
    process.env.WORKOS_STATE_SECRET!,
  );

  const authorizationUrl = await getSignInUrl({
    // Note: unfortunately redirect URIs for WorkOs must match
    // exactly the one set in the Workos dashboard,
    // so I can't use a dynamic redirect URI here.
    // redirectUri: `${process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI}&returnTo=${redirectUri}`,
    // Using the state prop instead
    state,
  });

  return redirect(authorizationUrl);
}
