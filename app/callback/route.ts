import { handleAuth } from "@workos-inc/authkit-nextjs";
import { NextRequest } from "next/server";

// redirect to page where user was before authentication
export const GET = (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const redirect =
    searchParams.get("redirect") == null ? "/" : searchParams.get("redirect");

  console.log("searchParams", searchParams);
  console.log("redirect", redirect);

  return handleAuth({
    returnPathname: redirect as string,
  })(request);
};
