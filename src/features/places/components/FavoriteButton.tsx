import Button from "@/components/ui/Button";
import { useFavorites } from "../hooks/useFavorites";

export default function FavoriteButton({ placeId, name }: { placeId: string; name: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(placeId);

  return (
    <Button
      variant="ghost"
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
      onClick={() => toggleFavorite(placeId)}
    >
      {active ? "♥ Saved" : "♡ Save"}
    </Button>
  );
}
