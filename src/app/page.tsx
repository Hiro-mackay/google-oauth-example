"use client";

import { Button } from "@/components/ui/button";

import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="min-h-screen justify-between p-10">
      <a href="/welcome" className="text-blue-500">
        /welcome
      </a>
    </main>
  );
}
