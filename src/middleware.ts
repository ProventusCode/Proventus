import createSupabaseServerClient from "@/lib/supabase/server";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  response.headers.append("Access-Control-Allow-Origin", "*");
  response.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  response.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  const supabase = await createSupabaseServerClient();
  await supabase.auth.getSession();
  return response;
}

export const config = {
  matcher: [
    "/api/:path*",
    "/core/:path*",
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
