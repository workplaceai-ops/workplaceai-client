import { useEffect, useState } from "react";
import type { Place } from "@/types/place";
import { fetchPlaceById } from "../api/placesApi";

export function usePlace(id: string | undefined) {
  const [place, setPlace] = useState<Place | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    if (!id) {
      setPlace(undefined);
      setLoading(false);
      return;
    }
    fetchPlaceById(id)
      .then((data) => {
        if (!cancelled) setPlace(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { place, loading };
}
