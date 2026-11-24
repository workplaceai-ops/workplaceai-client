import { Link, useParams } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import FavoriteButton from "../components/FavoriteButton";
import { usePlace } from "../hooks/usePlace";

export default function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { place, loading } = usePlace(id);

  if (loading) return <Loader />;

  if (!place) {
    return (
      <>
        <EmptyState title="Place not found" message="That place doesn't exist." />
        <p>
          <Link to="/places">← Back to all places</Link>
        </p>
      </>
    );
  }

  return (
    <article>
      <p>
        <Link to="/places">← Back to all places</Link>
      </p>
      <div
        className="detail-cover"
        style={{ background: `linear-gradient(135deg, ${place.gradient[0]}, ${place.gradient[1]})` }}
        aria-hidden="true"
      >
        <span className="detail-emoji">{place.emoji}</span>
      </div>

      <div className="detail-head">
        <div>
          <Badge>{place.category}</Badge>
          <h1>{place.name}</h1>
          <p className="muted">
            {place.city}, {place.state}
          </p>
        </div>
        <FavoriteButton placeId={place.id} name={place.name} />
      </div>

      <p className="lead">{place.description}</p>

      <div className="detail-grid">
        <section className="panel">
          <h2>Best time to visit</h2>
          <p>{place.bestTime}</p>
        </section>
        <section className="panel">
          <h2>Highlights</h2>
          <ul>
            {place.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
