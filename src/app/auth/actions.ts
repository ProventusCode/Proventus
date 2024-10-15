"use server";

import { RoleEnum } from "@/enums/RoleEnum";
import createSupabaseServerClient from "@/lib/supabase/server";
import { saveUserInfo } from "@/services/actions/UserInfoActions";
import { saveUserRole } from "@/services/actions/UserRoleActions";
import { UUID } from "crypto";
import { redirect } from "next/navigation";

type Credentials = {
  email: string;
  password: string;
};

type UserName = {
  username: string;
};

export async function signUpWithEmailAndPassword(
  credentials: Credentials & UserName
) {
  const supabase = await createSupabaseServerClient();

  const response = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        display_name: credentials.username,
      },
    },
  });

  if (response.error) {
    console.error("Error in signUpWithEmailAndPassword:", response.error);
    return "Ha ocurrido un error inesperado. Inténtalo de nuevo";
  }

  const userId = response.data?.user?.id as UUID;
  await saveUserInfo({
    userId,
    email: credentials.email,
    name: credentials.username,
  });
  await saveUserRole({ userId, role: RoleEnum.STUDENT });

  redirect("/core/");
}

export async function signInWithEmailAndPassword(credentials: Credentials) {
  const supabase = await createSupabaseServerClient();

  return await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
}
