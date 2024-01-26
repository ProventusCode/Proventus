import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import OAuthForm from "./OAuthForm";

export default function SignInForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Ingresa a tu cuenta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
          />
        </div>
        <div className="space-y-1">
          <Label className="sr-only" htmlFor="password">
            Contraseña
          </Label>
          <Input
            id="password"
            placeholder="Contraseña"
            type="password"
            autoCapitalize="none"
            autoCorrect="off"
          />
        </div>
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
