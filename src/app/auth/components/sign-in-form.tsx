import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signInWithEmailAndPassword } from "../actions";
import OAuthForm from "./oauth-form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(8, { message: "Contraseña muy corta" }),
});

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const signInForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (credentials: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await signInWithEmailAndPassword(credentials);
    if (response.error) {
      toast({
        variant: "destructive",
        title: "Error al iniciar sesión",
        description: "Correo electrónico o contraseña incorrectos",
      });
      return;
    }
    setIsLoading(false);
    router.push("/core/");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Ingresa a tu cuenta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...signInForm}>
          <form onSubmit={signInForm.handleSubmit(onSubmit)}>
            <FormField
              control={signInForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signInForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid pt-6">
              <Button type="submit" disabled={isLoading}>
                Registrarse{" "}
                {isLoading && (
                  <Icons.Spinner className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="grid gap-4">
        <Button>Entrar</Button>
        <OAuthForm />
        <Link
          className="text-sm text-muted-foreground text-center underline underline-offset-4 hover:text-primary"
          href="/forgot-password"
        >
          Olvidaste tu contraseña?
        </Link>
      </CardFooter>
    </Card>
  );
}
