import { google } from "googleapis";

export const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/auth/google-oauth/callback"
    : "https://google-oauth-example.vercel.app/api/auth/google-oauth/callback";

const OPTIONS = {
  clientId: process.env.GOOGLE_API_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_API_CLIENT_SECRET || "",
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
