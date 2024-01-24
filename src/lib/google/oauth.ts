import { google, oauth2_v2 } from "googleapis";
import { Credentials } from "google-auth-library/build/src/auth/credentials";
import { cookies } from "next/headers";

export const COOKIE_TOKEN_NAME = "google-oauth2-tokens";

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

export function setOAuthTokenCookie(credentials: Credentials) {
  return cookies().set({
    name: COOKIE_TOKEN_NAME,
    value: JSON.stringify(credentials),
    maxAge: 60 * 60 * 24 * 30, // 一ヶ月
    path: "/",
    sameSite: "lax",
    secure: true,
  });
}

export function getOAuthTokenCookie(): Credentials | undefined {
  const tokens = cookies().get(COOKIE_TOKEN_NAME)?.value;

  if (!tokens) return undefined;

  return JSON.parse(tokens);
}
