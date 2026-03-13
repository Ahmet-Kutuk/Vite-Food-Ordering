import Icon from "./Icon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onAddProduct: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onAddProduct,
}: SearchBarProps) {
  return (
    <div className="d-flex align-items-center gap-2 p-3 border-bottom bg-white flex-shrink-0">
      <button className="btn btn-sm btn-back d-flex align-items-center gap-2 text-white fw-semibold text-nowrap px-3">
        <Icon name="back" size={14} strokeWidth={2.5} />
        Geri
      </button>

      <div className="input-group">
        <span className="input-group-text bg-light border-end-0 shadow-none border-custom">
          <Icon name="search" size={14} />
        </span>
        <input
          type="text"
          className="form-control form-control-sm bg-light border-start-0 shadow-none border-custom"
          placeholder="Ürün ara..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <button
        className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 fw-medium text-nowrap border-custom"
        onClick={onAddProduct}
      >
        <Icon name="plus" size={13} strokeWidth={2.5} />
        Yeni Ürün
      </button>
    </div>
  );
}
