import { useState, useEffect } from "react";
import type { MenuItem, MenuState, MenuItemInput } from "../types";
import {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  seedMenuItems,
} from "../services/menuService";
import { INITIAL_MENU } from "../constants/initialMenu";

export function useMenu() {
  const [state, setState] = useState<MenuState>({
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const items = await getMenuItems();
        if (items.length === 0) {
          await seedMenuItems(INITIAL_MENU);
          setState({ items: INITIAL_MENU, loading: false, error: null });
        } else {
          setState({ items, loading: false, error: null });
        }
      } catch (err) {
        console.error("Menü yüklenemedi:", err);
        setState({
          items: INITIAL_MENU,
          loading: false,
          error: "Menü yüklenemedi, yerel veriler kullanılıyor.",
        });
      }
    };
    load();
  }, []);

  const addItem = async (item: MenuItemInput) => {
    try {
      const newItem = await addMenuItem(item);
      setState((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    } catch (err) {
      console.error("Ürün eklenemedi:", err);
      setState((prev) => ({ ...prev, error: "Ürün eklenemedi." }));
    }
  };

  const editItem = async (item: MenuItem) => {
    try {
      await updateMenuItem(item);
      setState((prev) => ({
        ...prev,
        items: prev.items.map((m) => (m.id === item.id ? item : m)),
      }));
    } catch (err) {
      console.error("Ürün güncellenemedi:", err);
      setState((prev) => ({ ...prev, error: "Ürün güncellenemedi." }));
    }
  };

  const removeItem = async (id: string) => {
    try {
      await deleteMenuItem(id);
      setState((prev) => ({
        ...prev,
        items: prev.items.filter((m) => m.id !== id),
      }));
    } catch (err) {
      console.error("Ürün silinemedi:", err);
      setState((prev) => ({ ...prev, error: "Ürün silinemedi." }));
    }
  };

  return {
    items: state.items,
    loading: state.loading,
    error: state.error,
    addItem,
    editItem,
    removeItem,
  };
}
