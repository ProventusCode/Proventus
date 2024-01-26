import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import createSupabaseServerClient from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");


  return NextResponse.redirect(requestUrl.origin);
}
