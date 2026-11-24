import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import type { Place } from "@/types/place";
import FavoriteButton from "./FavoriteButton";

export default function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="card">
      <div
        className="card-cover"
        style={{ background: `linear-gradient(135deg, ${place.gradient[0]}, ${place.gradient[1]})` }}
        aria-hidden="true"
      >
        <span className="card-emoji">{place.emoji}</span>
      </div>
      <div className="card-body">
        <Badge>{place.category}</Badge>
        <h3>{place.name}</h3>
        <p className="muted">
          {place.city}, {place.state}
        </p>
        <p>{place.tagline}</p>
        <div className="card-actions">
          <Link to={`/places/${place.id}`} className="btn btn-primary">
            View details
          </Link>
          <FavoriteButton placeId={place.id} name={place.name} />
        </div>
      </div>
    </article>
  );
}
