import { createOAuth2Client } from "@/lib/google/auth-client";
import { google } from "googleapis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

/**
 * google spreadsheet のデータを取得する
 * @param req
 */
export async function POST(req: NextRequest) {
  const { url, range } = await req.json();

  const spreadsheetId = getSpreadsheetIdFromUrl(url);

  if (!spreadsheetId) {
    return new Response("Invalid spreadsheet url", {
      status: 400,
    });
  }

  // const auth = createOAuth2Client();

  const credentials = cookies().get("google-oauth2-tokens")?.value;

  if (!credentials) {
    return new Response("Invalid credentials", {
      status: 400,
    });
  }

  const tokens = JSON.parse(credentials);

  const auth = createOAuth2Client();

  auth.setCredentials(tokens);

  const sheets = google.sheets({ version: "v4" });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
    auth,
  });

  console.log(JSON.stringify(response));

  return Response.json({
    data: response.data,
  });
}

function getSpreadsheetIdFromUrl(url: string) {
  // URLからスプレッドシートのIDを正規表現で抽出
  const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  const match = url.match(regex);

  // マッチした部分を取得
  if (match && match[1]) {
    const spreadsheetId = match[1];
    return spreadsheetId;
  } else {
    // マッチしない場合はエラー処理などを行うか、nullを返すなどの対応が必要
    return null;
  }
}
