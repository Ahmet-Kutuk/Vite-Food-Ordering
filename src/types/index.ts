import { ORDER_STATUS } from "./../constants/common";

// Base types
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

// Order
export type OrderStatus =
  | typeof ORDER_STATUS.OPEN
  | typeof ORDER_STATUS.PAID
  | typeof ORDER_STATUS.CANCELLED;

// Utility types
export type MenuItemInput = Omit<MenuItem, "id">;
export type MenuItemUpdate = Partial<MenuItemInput> & Pick<MenuItem, "id">;
