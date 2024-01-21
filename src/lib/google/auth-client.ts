import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET || "";

export const REDIRECT_URI =
  "https://google-oauth-example.vercel.app/api/auth/google-oauth/callback";

const OPTIONS = {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
};

export function createOAuth2Client(options?: {
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
}) {
  const { clientId, clientSecret, redirectUri } = {
    ...OPTIONS,
    ...options,
  };
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}
