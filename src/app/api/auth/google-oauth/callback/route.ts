import { createOAuth2Client, setOAuthTokenCookie } from "@/lib/google/oauth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const oauth2Client = createOAuth2Client();

  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return new Response(`Missing query parameter`, {
      status: 400,
    });
  }

  const { tokens } = await oauth2Client.getToken(code);

  setOAuthTokenCookie(tokens);

  const originalUrl =
    cookies().get("oauth2-redirect-original-url")?.value || "/";
  cookies().delete("oauth2-redirect-original-url");

  redirect(decodeURIComponent(originalUrl));
}
