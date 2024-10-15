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

  toast({
    title: "Ha ocurrido un error inesperado",
    description: error.message,
    action: (
      <ToastAction altText="Reload" onClick={reset}>
        Recargar
      </ToastAction>
    ),
  });
}
