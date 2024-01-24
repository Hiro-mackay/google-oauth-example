import { DriveLogo } from "@/components/logo/Drive";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createOAuth2Client, getOAuthTokenCookie } from "@/lib/google/oauth";
import { google } from "googleapis";
import { Download } from "lucide-react";
import Link from "next/link";

async function getDriveFiles() {
  const credentials = getOAuthTokenCookie();

  if (!credentials) return undefined;

  const auth = createOAuth2Client();
  auth.setCredentials(credentials);

  const files = await google.drive({ version: "v3", auth }).files.list({
    pageSize: 10,
    fields: "files(id, name, webContentLink)",
  });

  return files.data;
}

export default async function Home() {
  const data = await getDriveFiles();

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

      <CardContent className="flex flex-col divide-y">
        {data?.files?.length ? (
          data.files.map((file) => (
            <div
              key={file.id}
              className="flex justify-between items-center p-4"
            >
              <Link
                href={`https://drive.google.com/file/d/${file.id}/view?usp=drive_link`}
                className="text-blue-500 hover:underline"
              >
                {file.name}
              </Link>

              <Link href={file.webContentLink || ""} passHref>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!file.webContentLink}
                >
                  <Download />
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <p className="w-full p-10 text-center">No data.</p>
        )}
      </CardContent>
    </Card>
  );
}
