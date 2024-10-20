import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="max-w-md w-full px-6 py-8 shadow-2xl rounded-lg">
      <div className="flex flex-col items-center text-center">
        <XCircle className="h-24 w-24 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Acceso no autorizado
        </h1>
        <p className="text-gray-600 mb-6">
          Lo sentimos, no tienes permiso para ver este contenido. Por favor,
          contacta al administrador si crees que esto es un error.
        </p>
        <Link href="/core/" passHref>
          <Button variant="destructive" className="w-full">
            Volver a la página de inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
