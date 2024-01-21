import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET || "";

export const REDIRECT_URI =
  "https://google-oauth-example.vercel.app/api/auth/google-oauth/callback";

export function createOAuth2Client(options?: {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
}) {
  const clientId = options?.clientId || CLIENT_ID;
  const clientSecret = options?.clientSecret || CLIENT_SECRET;
  const redirectUri = options?.redirectUri || REDIRECT_URI;
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}
