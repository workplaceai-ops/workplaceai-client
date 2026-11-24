import { Link } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import PlaceCard from "@/features/places/components/PlaceCard";
import { usePlaces } from "@/features/places/hooks/usePlaces";

export default function HomePage() {
  const { places, loading } = usePlaces();
  const featured = places.slice(0, 3);

  return (
    <>
      <section className="hero">
        <h1>Discover Incredible India</h1>
        <p className="lead">
          From marble monuments and misty tea hills to quiet backwaters and mountain lakes, explore places worth a
          journey.
        </p>
        <Link to="/places" className="btn btn-primary">
          Browse all places
        </Link>
      </section>

      <section>
        <h2>Featured</h2>
        {loading && <Loader />}
        <div className="grid">
          {featured.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>
    </>
  );
}
