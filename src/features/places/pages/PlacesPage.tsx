import { useMemo, useState } from "react";
import SearchBar from "@/components/shared/SearchBar";
import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import { filterPlaces } from "@/lib/utils/filterPlaces";
import type { Category } from "@/types/place";
import CategoryFilter from "../components/CategoryFilter";
import PlaceCard from "../components/PlaceCard";
import { useFavorites } from "../hooks/useFavorites";
import { usePlaces } from "../hooks/usePlaces";

export default function PlacesPage() {
  const { places, loading, error } = usePlaces();
  const { favoriteIds } = useFavorites();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const visible = useMemo(
    () => filterPlaces(places, { query, category, favoritesOnly, favoriteIds }),
    [places, query, category, favoritesOnly, favoriteIds]
  );

  return (
    <section>
      <h1>Places to visit</h1>
      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by name, state or keyword" />
        <label className="toggle">
          <input type="checkbox" checked={favoritesOnly} onChange={(e) => setFavoritesOnly(e.target.checked)} />
          Favourites only
        </label>
      </div>
      <CategoryFilter value={category} onChange={setCategory} />

      {loading && <Loader label="Loading places..." />}
      {error && <p className="error">{error}</p>}

      {!loading && !error && visible.length === 0 && (
        <EmptyState title="No places found" message="Try a different search or clear the filters." />
      )}

      <div className="grid">
        {visible.map((p) => (
          <PlaceCard key={p.id} place={p} />
        ))}
      </div>
    </section>
  );
}
