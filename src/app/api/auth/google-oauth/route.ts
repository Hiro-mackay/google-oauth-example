import { createOAuth2Client } from "@/lib/google/auth-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

const scopes = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const redirectUri =
  "https://google-oauth-example.vercel.app/api/auth/google-oauth/callback";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const originalUrl = searchParams.get("originalUrl") || "/";

  cookies().set("oauth2-redirect-original-url", originalUrl);

  const oauth2Client = createOAuth2Client();

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    redirect_uri: redirectUri,
  });

  redirect(url);
}
