"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function signUpWithEmailAndPassword(credentials: {
  username: string;
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();
  return await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  });
}

export async function signInWithEmailAndPassword(credentials: {
  email: string;
  password: string;
}) {}
