import { CATEGORIES } from "../constants/common";

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="d-flex flex-wrap gap-2 p-3 border-bottom bg-white flex-shrink-0">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`btn btn-sm rounded-pill fw-medium ${active === cat ? "text-white btn-orange" : "btn-outline-secondary border-custom"}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
