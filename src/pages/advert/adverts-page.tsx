import { useEffect, useMemo, useState } from "react";
import Page from "../../components/layout/page";
import { AdvertItem } from "../../components/AdvertItem";
import { AdvertTableItem } from "../../components/AdvertTableItem";
import { useTags } from "../../hooks/useTags";
import { TagsSelector } from "../../components/TagSelector";
import { advertsLoaded } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAdverts } from "../../store/selectors";

export default function AdvertsPage() {
  const [filters, setFilters] = useState({
    name: "",
    sale: "all",
    priceRange: [0, 10000],
    selectedTags: [] as string[],
  });

  const tags = useTags();
  const dispatch = useAppDispatch();
  const allAdverts = useAppSelector(getAdverts);
  useEffect(() => {
    dispatch(advertsLoaded());
  }, [dispatch]);

  // Filtrado dinámico con useMemo
  const filteredAdverts = useMemo(() => {
    return allAdverts.filter((ad) => {
      const matchesName = filters.name
        ? ad.name.toLowerCase().startsWith(filters.name.toLowerCase())
        : true;

      const matchesSale =
        filters.sale === "all" ? true : ad.sale === (filters.sale === "true");

      const matchesPrice =
        ad.price >= filters.priceRange[0] && ad.price <= filters.priceRange[1];

      const matchesTags = filters.selectedTags.every((tag) =>
        ad.tags.some((t) => t.toString() === tag),
      );

      return matchesName && matchesSale && matchesPrice && matchesTags;
    });
  }, [filters, allAdverts]);

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  return (
    <Page title="">
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
            <div className="flex flex-col gap-4 md:col-span-2">
              <label className="text-text dark:text-dark-text text-sm font-medium">
                Rango de precio: {filters.priceRange[0]}€ -{" "}
                {filters.priceRange[1]}€
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="50"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [Number(e.target.value), prev.priceRange[1]],
                    }))
                  }
                  className="accent-primary w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="50"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number(e.target.value)],
                    }))
                  }
                  className="accent-primary w-full"
                />
              </div>
            </div>
          </div>

          <fieldset>
            <legend className="text-text dark:text-dark-text mb-2 text-sm font-medium">
              Tags
            </legend>
            <TagsSelector
              tags={tags}
              selected={filters.selectedTags}
              onToggle={handleTagToggle}
            />
          </fieldset>
        </div>

        <div className="overflow-x-auto">
          <table className="border-border dark:border-dark-border dark:bg-dark-background min-w-full border bg-white shadow-md">
            <thead className="bg-background dark:dark:bg-gray-900">
              <tr className="text-text dark:text-gray-400">
                <AdvertTableItem name="Nombre" />
                <AdvertTableItem name="Tipo" />
                <AdvertTableItem name="Precio" />
                <AdvertTableItem name="Tags" />
                <AdvertTableItem name="" />
              </tr>
            </thead>
            <tbody className="dark:bg-white/[0.03]">
              {filteredAdverts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-text/60 dark:text-dark-text/60 py-6 text-center"
                  >
                    No hay anuncios que coincidan con los filtros.
                  </td>
                </tr>
              ) : (
                filteredAdverts.map((ad) => <AdvertItem key={ad.id} ad={ad} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
