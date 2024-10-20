"use client";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { toast } = useToast();
  useEffect(() => {
    console.error(error);
  }, [error]);

  const message = `Intenta recargar la página para solucionar el problema. 
    Si el error persiste, contacta con el administrador.
  `;

  toast({
    title: "Ups! Parece que algo salió mal",
    description: message,
    variant: "destructive",
    action: (
      <ToastAction altText="Reload" onClick={reset}>
        Recargar
      </ToastAction>
    ),
  });
}
