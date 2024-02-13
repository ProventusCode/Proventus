import { Metadata } from "next";
import AuthForm from "./components/auth-form";
import { redirect } from "next/navigation";
import readUserSession from "@/lib/supabase/actions";

export const metadata: Metadata = {
  title: "Iniciar sesión | Proventus",
  description: "Crea una cuenta en Proventus",
};

export default async function AuthenticationPage() {
  const { data } = await readUserSession();
  if (data.session) {
    return redirect("/submissions");
  }
  return (
    <div
      className="container relative hidden h-screen flex-col items-center justify-center
       md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
      <div className="inset-0 items-center justify-center relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-20 w-20"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <div className="animate-pulse text-6xl font-bold">Proventus</div>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
