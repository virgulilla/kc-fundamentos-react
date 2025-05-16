import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { newAdvert } from "./service";
import { Button } from "../../components/Button";
import Layout from "../../components/layout/layout";

export default function NewAdvertPage() {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    sale: "",
    tags: [] as string[],
  });

  const isFormValid =
    formState.name &&
    formState.price &&
    formState.sale &&
    formState.tags.length > 0;

  const handleTagToggle = (tag: string) => {
    setFormState((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target as HTMLFormElement);

      const data = new FormData();
      data.append("name", formState.name);
      data.append("sale", formState.sale);
      data.append("price", formState.price);

      formState.tags.forEach((tag) => data.append("tags", tag));

      const file = formData.get("photo") as File;
      if (file && file.size > 0) {
        data.append("photo", file);
      }

      await newAdvert(data);
      navigate("/adverts", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title="Crear anuncio">
      <div className="px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full max-w-2xl space-y-6 rounded bg-white p-8 shadow-md dark:bg-white/[0.03] dark:text-white"
        >
          <div>
            <label
              htmlFor="name"
              className="text-text block text-sm font-medium dark:text-white"
            >
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formState.name}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border-border focus:border-primary focus:ring-primary mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-1 focus:outline-none dark:text-white"
            />
          </div>

          <div>
            <label className="text-text mb-1 block text-sm font-medium dark:text-white">
              Tipo
            </label>
            <div className="flex gap-4">
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="sale"
                  value="true"
                  checked={formState.sale === "true"}
                  onChange={() =>
                    setFormState((prev) => ({ ...prev, sale: "true" }))
                  }
                  className="mr-2"
                  required
                />
                Venta
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="sale"
                  value="false"
                  checked={formState.sale === "false"}
                  onChange={() =>
                    setFormState((prev) => ({ ...prev, sale: "false" }))
                  }
                  className="mr-2"
                />
                Compra
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="price"
              className="text-text block text-sm font-medium dark:text-white"
            >
              Precio
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              value={formState.price}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, price: e.target.value }))
              }
              className="border-border focus:border-primary focus:ring-primary mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-1 focus:outline-none dark:text-white"
            />
          </div>

          <div>
            <label className="text-text mb-1 block text-sm font-medium dark:text-white">
              Tags
            </label>
            <div className="flex flex-wrap gap-3">
              {["lifestyle", "mobile", "motor", "work"].map((tag) => (
                <label key={tag} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag}
                    checked={formState.tags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="mr-2"
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="photo"
              className="text-text mb-1 block text-sm font-medium dark:text-white"
            >
              Foto
            </label>

            <label
              htmlFor="photo"
              className="border-border bg-background dark:bg-dark-background text-text/60 hover:bg-background/80 flex h-32 w-full cursor-pointer items-center justify-center rounded border border-dashed text-sm transition dark:text-white"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="h-full object-contain"
                />
              ) : (
                "Haz clic para seleccionar una imagen"
              )}
            </label>

            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreviewUrl(URL.createObjectURL(file));
                } else {
                  setPreviewUrl(null);
                }
              }}
            />
          </div>

          <div>
            <Button
              text="Crear anuncio"
              classes="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 focus:outline-none disabled:bg-primary/40 disabled:text-white/70 disabled:cursor-not-allowed"
              type="submit"
              disabled={!isFormValid}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
