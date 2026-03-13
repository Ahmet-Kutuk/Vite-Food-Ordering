import type { MenuItem, OrderItem } from "../types";
import MenuCard from "./MenuCard";

interface MenuGridProps {
  items: MenuItem[];
  orderItems: OrderItem[];
  onAdd: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (item: MenuItem) => void;
}

export default function MenuGrid({
  items,
  orderItems,
  onAdd,
  onDelete,
  onRemove,
  onEdit,
}: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="menu-grid p-3">
        <div className="text-center text-muted small py-5 full-col">
          Ürün bulunamadı
        </div>
      </div>
    );
  }

  return (
    <div className="menu-grid p-3">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          orderItems={orderItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
