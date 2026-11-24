import type { Category } from "@/types/place";

export const CATEGORIES: (Category | "All")[] = ["All", "Heritage", "Nature", "Beach", "Spiritual", "Adventure"];

interface CategoryFilterProps {
  value: Category | "All";
  onChange: (value: Category | "All") => void;
}

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="chips" role="group" aria-label="Filter by category">
      {CATEGORIES.map((c) => (
        <button
          key={c}
          type="button"
          className={`chip ${value === c ? "chip-active" : ""}`.trim()}
          aria-pressed={value === c}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
