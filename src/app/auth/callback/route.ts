import { RoleEnum } from "@/enums/RoleEnum";
import createSupabaseServerClient from "@/lib/supabase/server";
import {
  exitsUserById,
  saveUserInfo,
} from "@/services/actions/UserInfoActions";
import { saveUserRole } from "@/services/actions/UserRoleActions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/core";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/fail`);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/auth/fail`);
  }
  const { user } = data;
  console.log("user", user);
  if (user && !(await exitsUserById(user.id))) {
    const { id, email, user_metadata } = user;
    await saveUserInfo({
      userId: id,
      email: email ?? user_metadata.email,
      name: user_metadata.display_name ?? user_metadata.name,
    });
    await saveUserRole({ userId: id, role: RoleEnum.STUDENT });
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.APP_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    return NextResponse.redirect(`${origin}${next}`);
  }
}
