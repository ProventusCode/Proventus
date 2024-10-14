"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { readUser } from "@/lib/supabase/actions";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Package2Icon, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const { data } = await readUser();
      setName(
        data?.user?.user_metadata?.display_name ??
          data?.user?.user_metadata?.user_name
      );
    };
    fetchUsername();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="flex h-14 lg:h-[60px] items-center justify-end gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Link className="lg:hidden" href="#">
        <Package2Icon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <span>{name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
            size="icon"
            variant="ghost"
          >
            <User height={32} className="rounded-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Configuraciones</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600" onClick={handleSignOut}>
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
