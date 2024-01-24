"use client";

import { DriveLogo } from "@/components/logo/Drive";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  return (
    <main className="min-h-screen flex justify-center items-start p-10">
      <Card className="max-w-[800px] w-full">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="flex gap-3 items-center">
              <DriveLogo className="text-3xl" />
              Google Drive
            </CardTitle>
          </div>
        </CardHeader>
      </Card>
    </main>
  );
}
