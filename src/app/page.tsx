import { DriveLogo } from "@/components/logo/Drive";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center p-10">
      <Link href={`/api/auth/google-oauth`}>
        <Button>
          <DriveLogo className="mr-2 text-xl" />
          <p>Drive 連携</p>
        </Button>
      </Link>
    </main>
  );
}
