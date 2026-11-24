import type { Place } from "@/types/place";
import { places } from "../data/places";

// Currently reads local data. To use a real backend, replace the bodies with:
//   return apiFetch<Place[]>(ENDPOINTS.places);
//   return apiFetch<Place>(ENDPOINTS.placeById(id));
// (import { apiFetch } from "@/lib/api/client"; import { ENDPOINTS } from "@/lib/api/endpoints";)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchPlaces(): Promise<Place[]> {
  await delay(250);
  return places;
}

export async function fetchPlaceById(id: string): Promise<Place | undefined> {
  await delay(150);
  return places.find((p) => p.id === id);
}
