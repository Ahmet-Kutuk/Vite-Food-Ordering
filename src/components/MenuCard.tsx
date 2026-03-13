import type { MenuItem, OrderItem } from "../types";
import Icon from "./Icon";

interface MenuCardProps {
  item: MenuItem;
  orderItems: OrderItem[];
  onAdd: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (item: MenuItem) => void;
}

export default function MenuCard({
  item,
  orderItems,
  onAdd,
  onDelete,
  onEdit,
}: MenuCardProps) {
  const quantity =
    orderItems.find((o) => o.menuItem.id === item.id)?.quantity ?? 0;

  return (
    <div
      className={`menu-card card border rounded-3 p-3 position-relative ${quantity > 0 ? "in-order" : ""}`}
      onClick={() => onAdd(item)}
    >
      <div className="menu-card-actions d-flex gap-1 position-absolute top-0 end-0 m-2">
        <button
          className="card-btn btn btn-sm d-flex align-items-center justify-content-center rounded-2 icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
        >
          <Icon name="edit" size={14} />
        </button>
        <button
          className="card-btn del btn btn-sm d-flex align-items-center justify-content-center rounded-2 icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
        >
          <Icon name="trash" size={14} />
        </button>
      </div>

      <div className="mb-2 fs-26 lh-13">{item.emoji}</div>
      <div className="fw-semibold small mb-1 text-111827 lh-13">
        {item.name}
      </div>

      <div className="d-flex align-items-center justify-content-between mt-1">
        <span className="menu-card-price">
          ₺{item.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}
