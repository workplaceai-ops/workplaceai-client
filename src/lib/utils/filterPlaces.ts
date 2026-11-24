import type { Category, Place } from "@/types/place";

export interface PlaceFilters {
  query: string;
  category: Category | "All";
  favoritesOnly: boolean;
  favoriteIds: string[];
}

export function filterPlaces(places: Place[], filters: PlaceFilters): Place[] {
  const q = filters.query.trim().toLowerCase();

  return places.filter((p) => {
    if (filters.category !== "All" && p.category !== filters.category) return false;
    if (filters.favoritesOnly && !filters.favoriteIds.includes(p.id)) return false;
    if (!q) return true;
    const haystack = `${p.name} ${p.city} ${p.state} ${p.description}`.toLowerCase();
    return haystack.includes(q);
  });
}
