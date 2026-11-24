import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "@/features/places/hooks/useFavorites";

export default function Header() {
  const { favoriteIds } = useFavorites();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          🇮🇳 Incredible India
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/places">
            Places{favoriteIds.length > 0 ? ` (♥ ${favoriteIds.length})` : ""}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
