"use client";

import { Button } from "@/components/ui/button";

import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);

  const oauthRedirect = () => {
    router.push(`/api/auth/google-oauth/?originalUrl=${pathname}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={oauthRedirect}>Google OAuth</Button>
    </main>
  );
}
