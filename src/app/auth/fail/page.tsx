import { AlertCircle } from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthenticationErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Error de Autenticación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Ocurrió un error durante el proceso de autenticación OAuth.
            </AlertDescription>
          </Alert>
          <p className="text-center text-gray-600">
            No pudimos completar el proceso de inicio de sesión. Esto podría
            deberse a un código de autenticación expirado o inválido.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/auth">Intentar de nuevo</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
