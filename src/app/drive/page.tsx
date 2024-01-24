import { DriveLogo } from "@/components/logo/Drive";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createOAuth2Client, getOAuthTokenCookie } from "@/lib/google/oauth";
import { google } from "googleapis";

async function getDriveFiles() {
  "use server";
  const credentials = getOAuthTokenCookie();

  if (!credentials) return undefined;

  const auth = createOAuth2Client();
  auth.setCredentials(credentials);

  const files = await google.drive({ version: "v3", auth }).files.list({
    pageSize: 10,
    fields: "files(id, name)",
  });

  return files.data;
}

export default async function Home() {
  const files = await getDriveFiles();

  console.log(files);

  console.log("drive");

  return (
    <Card className="max-w-[800px] w-full">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="flex gap-3 items-center">
            <DriveLogo className="text-3xl" />
            Google Drive
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
}
