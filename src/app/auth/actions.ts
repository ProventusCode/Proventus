"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

interface Credentials {
  email: string;
  password: string;
  username?: string;
}

export async function signUpWithEmailAndPassword(credentials: Credentials) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        display_name: credentials.username,
      },
    },
  });

  if (error) {
    return "Ha ocurrido un error inesperado. Inténtalo de nuevo";
  }
}

export async function signInWithEmailAndPassword(credentials: Credentials) {
  const supabase = await createSupabaseServerClient();

  return await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
}
