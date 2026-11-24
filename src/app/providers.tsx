import type { ReactNode } from "react";
import { FavoritesProvider } from "@/features/places/hooks/useFavorites";

export default function Providers({ children }: { children: ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
