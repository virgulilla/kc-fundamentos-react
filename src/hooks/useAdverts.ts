// hooks/useAdverts.ts
import { useEffect, useState } from "react";
import { getAdverts } from "../pages/advert/service";
import type { Advert } from "../pages/advert/types";
import { ZodError } from "zod";
import { useAppDispatch } from "../store";
import { advertsLoaded } from "../store/actions";

export function useAdverts() {
  const dispatch = useAppDispatch()
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdverts()
      .then(adverts => {
        setAdverts(adverts);
        dispatch(advertsLoaded(adverts));
      })
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
      
  }, [dispatch]);

  return { adverts, error };
}
