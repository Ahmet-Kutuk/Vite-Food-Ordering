import { useState } from "react";
import type { MenuItem } from "./types";
import { useMenu } from "./hooks/useMenu";
import { useOrder } from "./hooks/useOrder";
import Topbar from "./components/TopBar";
import MenuPanel from "./components/MenuPanel";
import OrderPanel from "./components/OrderPanel";
import PaymentModal from "./components/PaymentModal";
import AddProductModal from "./components/AddProductModal";
import { CATEGORY_ALL } from "./constants/common";

export default function App() {
  const { items, loading, error, addItem, editItem, removeItem } = useMenu();
  const {
    orderItems,
    total,
    addItem: addToOrder,
    removeItem: removeFromOrder,
    clearItems,
  } = useOrder();

  const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editMenuItem, setEditMenuItem] = useState<MenuItem | null>(null);

  const handlePaymentConfirm = () => {
    clearItems();
    setIsPaymentOpen(false);
  };

  const handleAddMenuItem = async (item: MenuItem) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, ...rest } = item;
    await addItem(rest);
  };

  const handleEditMenuItem = async (item: MenuItem) => {
    await editItem(item);
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="spinner-border mb-3 text-orange" />
          <div className="text-muted small">Menü yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      <Topbar />
      {error && (
        <div className="alert alert-warning alert-dismissible mb-0 py-2 px-3 rounded-0 small">
          {error}
        </div>
      )}
      <div className="app-container flex-grow-1 overflow-hidden">
        <MenuPanel
          items={items}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onAddItem={addToOrder}
          onDeleteItem={removeItem}
          onRemoveItem={removeFromOrder}
          onEditItem={(item) => {
            setEditMenuItem(item);
            setIsAddProductOpen(true);
          }}
          onAddProduct={() => setIsAddProductOpen(true)}
          orderItems={orderItems}
        />
        <OrderPanel
          orderItems={orderItems}
          total={total}
          onAdd={addToOrder}
          onRemove={removeFromOrder}
          onClear={clearItems}
          onPaymentOpen={() => setIsPaymentOpen(true)}
        />
      </div>

      <PaymentModal
        isOpen={isPaymentOpen}
        total={total}
        onConfirm={handlePaymentConfirm}
        onClose={() => setIsPaymentOpen(false)}
      />

      <AddProductModal
        key={editMenuItem?.id ?? "new"}
        isOpen={isAddProductOpen}
        onClose={() => {
          setIsAddProductOpen(false);
          setEditMenuItem(null);
        }}
        onAdd={handleAddMenuItem}
        onEdit={handleEditMenuItem}
        editItem={editMenuItem}
      />
    </div>
  );
}
