"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { saveUserRole } from "@/services/actions/UserRoleActions";
import { UUID } from "crypto";
import { redirect } from "next/navigation";

interface Credentials {
  email: string;
  password: string;
  username?: string;
}

export async function signUpWithEmailAndPassword(credentials: Credentials) {
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
  await saveUserRole(userId);

  redirect("/core/");
}

export async function signInWithEmailAndPassword(credentials: Credentials) {
  const supabase = await createSupabaseServerClient();

  return await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
}
