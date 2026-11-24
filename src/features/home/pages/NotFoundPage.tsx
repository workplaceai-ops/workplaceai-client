import { Link } from "react-router-dom";
import EmptyState from "@/components/shared/EmptyState";

export default function NotFoundPage() {
  return (
    <>
      <EmptyState title="Page not found" message="The page you're looking for doesn't exist." />
      <p>
        <Link to="/">← Back to home</Link>
      </p>
    </>
  );
}
