import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { getAdvert, deleteAdvert } from "./service";
import { Button } from "../../components/Button";
import { ConfirmModal } from "../../components/ConfirmModal";
import { type Advert } from "./types";

export default function AdvertPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchAdvert = async () => {
      try {
        const data = await getAdvert(id);
        setAdvert(data);
      } catch (err) {
        console.error(err);
        setAdvert(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvert();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteAdvert(id);
      navigate("/adverts", { replace: true });
    } catch (err) {
      console.error("Error eliminando anuncio:", err);
    }
  };

  if (loading) {
    return (
      <Layout title="Cargando...">
        <div className="text-text flex h-full items-center justify-center dark:text-white">
          Cargando anuncio...
        </div>
      </Layout>
    );
  }

  if (!advert) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Layout title={advert.name}>
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-10">
        <div className="flex w-full flex-col items-center gap-6 rounded-lg bg-white p-4 shadow-lg sm:p-8 md:flex-row dark:bg-white/[0.03] dark:text-white">
          {advert.photo && (
            <div className="flex w-full justify-center md:w-1/2">
              <img
                src={advert.photo}
                alt={advert.name}
                className="w-full max-w-sm rounded-lg object-contain shadow-md"
              />
            </div>
          )}

          <div className="mt-6 w-full space-y-4 md:mt-0 md:w-1/2">
            <h1 className="text-3xl font-bold sm:text-4xl">{advert.name}</h1>

            <div>
              <span className="text-text/70 mb-1 block text-sm dark:text-white/70">
                Precio
              </span>
              <span className="text-2xl font-bold sm:text-3xl">
                {advert.price} €
              </span>
            </div>

            <div>
              <span className="text-text/70 mb-1 block text-sm dark:text-white/70">
                Tipo
              </span>
              <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-sm font-medium">
                {advert.sale ? "Venta" : "Compra"}
              </span>
            </div>

            <div>
              <span className="text-text/70 mb-1 block text-sm dark:text-white/70">
                Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {advert.tags?.length > 0
                  ? advert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-white/[0.1] dark:text-white"
                      >
                        {tag}
                      </span>
                    ))
                  : "Sin etiquetas"}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <Button
                type="button"
                text="Volver al listado"
                onClick={() => navigate("/adverts")}
                classes="w-full sm:w-auto rounded bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                type="button"
                text="Eliminar anuncio"
                onClick={() => setIsConfirmOpen(true)}
                classes="w-full sm:w-auto rounded bg-danger px-4 py-2 text-white hover:bg-danger/90 focus:outline-none focus:ring-2 focus:ring-danger/50"
              />
            </div>
          </div>
        </div>
      </div>

      {isConfirmOpen && (
        <ConfirmModal
          title="Confirmar eliminación"
          message="¿Estás seguro de que deseas eliminar este anuncio? Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </Layout>
  );
}
