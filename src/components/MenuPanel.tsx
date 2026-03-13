import { useState } from "react";
import type { MenuPanelProps } from "../types";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import MenuGrid from "./MenuGrid";
import { CATEGORY_ALL } from "../constants/common";

export default function MenuPanel({
  items,
  activeCategory,
  onCategoryChange,
  onAddItem,
  onDeleteItem,
  onRemoveItem,
  onEditItem,
  onAddProduct,
  orderItems,
}: MenuPanelProps) {
  const [search, setSearch] = useState("");

  const filtered = items
    .filter(
      (item) =>
        activeCategory === CATEGORY_ALL || item.category === activeCategory,
    )
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="menu-panel d-flex flex-column h-100">
      <SearchBar
        value={search}
        onChange={setSearch}
        onAddProduct={onAddProduct}
      />
      <CategoryFilter active={activeCategory} onChange={onCategoryChange} />
      <MenuGrid
        items={filtered}
        orderItems={orderItems}
        onAdd={onAddItem}
        onDelete={onDeleteItem}
        onRemove={onRemoveItem}
        onEdit={onEditItem}
      />
    </div>
  );
}
