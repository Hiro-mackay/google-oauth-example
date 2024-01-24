import { createOAuth2Client, setOAuthTokenCookie } from "@/lib/google/oauth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const oauth2Client = createOAuth2Client();

  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return new Response(`Missing code query parameter`, {
      status: 400,
    });
  }

  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  setOAuthTokenCookie(tokens);

  redirect("/drive");
}
