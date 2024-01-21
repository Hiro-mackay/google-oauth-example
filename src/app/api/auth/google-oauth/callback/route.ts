import { createOAuth2Client } from "@/lib/google/auth-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const oauth2Client = createOAuth2Client();

  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  const originalUrl =
    cookies().get("oauth2-redirect-original-url")?.value || "/";

  if (!code) {
    return new Response(`Missing code query parameter`, {
      status: 400,
    });
  }

  const { tokens } = await oauth2Client.getToken(code);

  cookies().set({
    name: "google-oauth2-tokens",
    value: JSON.stringify(tokens),
    maxAge: 60 * 60 * 24 * 30, // 1 year
    path: "/",
    sameSite: "lax",
    secure: true,
  });

  redirect(originalUrl);
}
