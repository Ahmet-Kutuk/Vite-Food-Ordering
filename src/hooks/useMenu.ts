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

interface UseMenuOptions {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useMenu({ onSuccess, onError }: UseMenuOptions = {}) {
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
      } catch {
        setState({
          items: INITIAL_MENU,
          loading: false,
          error: "Menü yüklenemedi.",
        });
        onError?.("Menü yüklenemedi, yerel veriler kullanılıyor.");
      }
    };
    load();
  }, []);

  const addItem = async (item: MenuItemInput) => {
    try {
      const newItem = await addMenuItem(item);
      setState((prev) => ({ ...prev, items: [...prev.items, newItem] }));
      onSuccess?.(`${newItem.name} menüye eklendi`);
    } catch {
      onError?.("Ürün eklenemedi.");
    }
  };

  const editItem = async (item: MenuItem) => {
    try {
      await updateMenuItem(item);
      setState((prev) => ({
        ...prev,
        items: prev.items.map((m) => (m.id === item.id ? item : m)),
      }));
      onSuccess?.(`${item.name} güncellendi`);
    } catch {
      onError?.("Ürün güncellenemedi.");
    }
  };

  const removeItem = async (id: string) => {
    const item = state.items.find((m) => m.id === id);
    try {
      await deleteMenuItem(id);
      setState((prev) => ({
        ...prev,
        items: prev.items.filter((m) => m.id !== id),
      }));
      onSuccess?.(`${item?.name ?? "Ürün"} silindi`);
    } catch {
      onError?.("Ürün silinemedi.");
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
