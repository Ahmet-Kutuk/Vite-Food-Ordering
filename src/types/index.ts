import { ORDER_STATUS, PAYMENT_METHODS } from "./../constants/common";

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

// Component props
export interface MenuPanelProps {
  items: MenuItem[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onAddItem: (item: MenuItem) => void;
  onDeleteItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onEditItem: (item: MenuItem) => void;
  onAddProduct: () => void;
  orderItems: OrderItem[];
}

export interface OrderPanelProps {
  orderItems: OrderItem[];
  total: number;
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onPaymentOpen: () => void;
}

export interface PaymentModalProps {
  isOpen: boolean;
  total: number;
  onConfirm: () => void;
  onClose: () => void;
}

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: MenuItem) => void;
  onEdit: (item: MenuItem) => void;
  editItem?: MenuItem | null;
}

export type PaymentMethod =
  | typeof PAYMENT_METHODS.CASH
  | typeof PAYMENT_METHODS.CARD
  | typeof PAYMENT_METHODS.QR;
