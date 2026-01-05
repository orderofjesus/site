import { verifyAndParseState } from "@/lib/oauthstate";
import { handleAuth } from "@workos-inc/authkit-nextjs";
import { NextRequest, NextResponse } from "next/server";

// redirect to page where user was before authentication
export const GET = (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const redirectUri =
    searchParams.get("returnTo") == null ? "/" : searchParams.get("returnTo");

  // const code = request.nextUrl.searchParams.get("code");
  // if (!code) {
  //   return NextResponse.redirect(new URL(`/login?error=missing_code`, process.env.APP_URL));
  // }

  const state = request.nextUrl.searchParams.get("state") ?? "";

  const parsed = verifyAndParseState(state, process.env.WORKOS_STATE_SECRET!);
  const parsedRedirectUri = parsed?.returnTo ?? "/";

  console.log("searchParams on callback", searchParams);
  console.log("returnTo on callback", redirectUri);

  return handleAuth({
    returnPathname: parsedRedirectUri as string,
  })(request);
};
