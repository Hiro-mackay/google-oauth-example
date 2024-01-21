import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET || "";

export function createOAuth2Client(
  clientId: string = CLIENT_ID,
  clientSecret: string = CLIENT_SECRET,
  redirectUri?: string
) {
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}
