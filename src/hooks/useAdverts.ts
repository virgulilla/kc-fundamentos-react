// hooks/useAdverts.ts
import { useEffect, useState } from "react";
import { getAdverts } from "../pages/advert/service";
import type { Advert } from "../pages/advert/types";
import { ZodError } from "zod";

export function useAdverts() {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdverts()
      .then(setAdverts)
      .catch((error: unknown) => {
        if (error instanceof ZodError) {
          const formatted = error.errors.map(
            (e) => `${e.path.join(".")} - ${e.message}`,
          );
          console.error("Errores de validación Zod:", formatted);
          setError(formatted.join(", "));
        } else {
          console.error("Error inesperado:", error);
        }
      });
  }, []);

  return { adverts, error };
}
