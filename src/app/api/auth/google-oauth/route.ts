import { createOAuth2Client } from "@/lib/google/oauth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

const scopes = ["https://www.googleapis.com/auth/drive.readonly"];

export async function GET(req: NextRequest) {
  const oauth2Client = createOAuth2Client();

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  const searchParams = req.nextUrl.searchParams;
  const originalUrl = searchParams.get("originalUrl") || "/";
  cookies().set("oauth2-redirect-original-url", originalUrl);

  redirect(url);
}
