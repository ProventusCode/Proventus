"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import React from "react";

export default function OAuthForm() {
  const supabase = createSupabaseBrowserClient();

  const loginWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" onClick={loginWithGitHub}>
        <Icons.GitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </>
  );
}
