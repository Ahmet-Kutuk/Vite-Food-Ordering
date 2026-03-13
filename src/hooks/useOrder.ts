import { useState } from "react";
import type { MenuItem, OrderItem, OrderState } from "../types";

export function useOrder() {
  const [state, setState] = useState<OrderState>({
    items: [],
    total: 0,
  });

  const calcTotal = (items: OrderItem[]) =>
    items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);

  const addItem = (menuItem: MenuItem) => {
    setState((prev) => {
      const existing = prev.items.find((i) => i.menuItem.id === menuItem.id);
      const items = existing
        ? prev.items.map((i) =>
            i.menuItem.id === menuItem.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : [...prev.items, { menuItem, quantity: 1 }];
      return { items, total: calcTotal(items) };
    });
  };

  const removeItem = (menuItemId: string) => {
    setState((prev) => {
      const existing = prev.items.find((i) => i.menuItem.id === menuItemId);
      const items =
        existing?.quantity === 1
          ? prev.items.filter((i) => i.menuItem.id !== menuItemId)
          : prev.items.map((i) =>
              i.menuItem.id === menuItemId
                ? { ...i, quantity: i.quantity - 1 }
                : i,
            );
      return { items, total: calcTotal(items) };
    });
  };

  const clearItems = () => setState({ items: [], total: 0 });

  return {
    orderItems: state.items,
    total: state.total,
    addItem,
    removeItem,
    clearItems,
  };
}
