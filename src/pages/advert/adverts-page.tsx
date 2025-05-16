import { useEffect, useState } from "react";
import { getAdverts, getTags } from "./service";
import type { Advert, Tag } from "./types";
import Layout from "../../components/layout/layout";
import { Link } from "react-router-dom";
import Icon from "../../components/icon";

export default function AdvertsPage() {
  const [allAdverts, setAllAdverts] = useState<Advert[]>([]);
  const [filteredAdverts, setFilteredAdverts] = useState<Advert[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [filters, setFilters] = useState({
    name: "",
    sale: "all",
    price: "",
    maxPrice: "",
    selectedTags: [] as string[],
  });

  useEffect(() => {
    getAdverts().then((data) => {
      setAllAdverts(data);
      setFilteredAdverts(data);
    });

    getTags().then(setTags);
  }, []);

  useEffect(() => {
    const result = allAdverts.filter((ad) => {
      const matchesName = filters.name
        ? ad.name.toLowerCase().startsWith(filters.name.toLowerCase())
        : true;

      const matchesSale =
        filters.sale === "all" ? true : ad.sale === (filters.sale === "true");

      const matchesPrice =
        !filters.price || ad.price >= parseFloat(filters.price);

      const matchesTags = filters.selectedTags.every((tag) =>
        tagsInclude(ad.tags, tag),
      );

      return matchesName && matchesSale && matchesPrice && matchesTags;
    });

    setFilteredAdverts(result);
  }, [filters, allAdverts]);

  const tagsInclude = (tags: Tag[], tag: string) =>
    tags.some((t) => t.toString() === tag);

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  return (
    <Layout title="Listado de anuncios">
      <div className="space-y-8 bg-white/[0.03] p-8">
        {/* Filtros */}
        <div className="dark:bg-dark-background space-y-6 rounded bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              placeholder="Filtrar por nombre"
              className="border-border dark:border-dark-border text-text dark:text-dark-text dark:bg-dark-background focus:ring-primary dark:focus:ring-dark-primary rounded border bg-white px-3 py-2 focus:ring-1 focus:outline-none"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <select
              className="border-border dark:border-dark-border text-text dark:text-dark-text dark:bg-dark-background focus:ring-primary dark:focus:ring-dark-primary rounded border bg-white px-3 py-2 focus:ring-1 focus:outline-none"
              value={filters.sale}
              onChange={(e) => setFilters({ ...filters, sale: e.target.value })}
            >
              <option value="all">Compra/Venta</option>
              <option value="true">Venta</option>
              <option value="false">Compra</option>
            </select>
            <input
              type="number"
              placeholder="Precio mínimo"
              className="border-border dark:border-dark-border text-text dark:text-dark-text dark:bg-dark-background focus:ring-primary dark:focus:ring-dark-primary rounded border bg-white px-3 py-2 focus:ring-1 focus:outline-none"
              value={filters.price}
              onChange={(e) =>
                setFilters({ ...filters, price: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Precio máximo"
              className="border-border dark:border-dark-border text-text dark:text-dark-text dark:bg-dark-background focus:ring-primary dark:focus:ring-dark-primary rounded border bg-white px-3 py-2 focus:ring-1 focus:outline-none"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>

          <fieldset>
            <legend className="text-text dark:text-dark-text mb-2 text-sm font-medium">
              Tags
            </legend>
            <div className="flex flex-wrap gap-4">
              {tags.map((tag) => (
                <label
                  key={tag}
                  className="text-text dark:text-dark-text flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    checked={filters.selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="accent-primary dark:accent-dark-primary"
                  />
                  {tag}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="overflow-x-auto">
          <table className="border-border dark:border-dark-border dark:bg-dark-background min-w-full border bg-white shadow-md">
            <thead className="bg-background dark:dark:bg-gray-900">
              <tr className="text-text dark:text-gray-400">
                <th className="border-border dark:border-dark-border border px-4 py-2">
                  Nombre
                </th>
                <th className="border-border dark:border-dark-border border px-4 py-2">
                  Tipo
                </th>
                <th className="border-border dark:border-dark-border border px-4 py-2">
                  Precio
                </th>
                <th className="border-border dark:border-dark-border border px-4 py-2">
                  Tags
                </th>
                <th className="border-border dark:border-dark-border border px-4 py-2" />
              </tr>
            </thead>
            <tbody className="dark:bg-white/[0.03]">
              {filteredAdverts.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-text/60 dark:text-dark-text/60 py-6 text-center"
                  >
                    No hay anuncios que coincidan con los filtros.
                  </td>
                </tr>
              ) : (
                filteredAdverts.map((ad) => (
                  <tr
                    key={ad.id}
                    className="border-border dark:border-dark-border text-text dark:text-dark-text border-t text-center"
                  >
                    <td className="px-4 py-2">{ad.name}</td>
                    <td className="px-4 py-2">
                      {ad.sale ? "Venta" : "Compra"}
                    </td>
                    <td className="px-4 py-2">{ad.price} €</td>
                    <td className="px-4 py-2">{ad.tags.join(", ")}</td>
                    <td>
                      <Link
                        to={`/adverts/${ad.id}`}
                        title="Ver anuncio"
                        className="inline-flex"
                      >
                        <Icon
                          name="eye"
                          className="text-primary hover:text-primary/70 dark:text-dark-primary dark:hover:text-dark-primary/70"
                        />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
