import { createOAuth2Client } from "@/lib/google/auth-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  redirect(decodeURIComponent("%2Fwelcome"));
}
