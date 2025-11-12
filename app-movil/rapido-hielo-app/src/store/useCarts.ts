import { create } from "zustand";
import { axiosInstance } from "../axios/axiosInstance";
import { Cart, CartItem } from "@/types/Cart";

interface CartStore {
  cartUsed: Cart["id"];
  items: CartItem[];
  itemCount: number;
  fetchCartItemCount: (client_id: string) => Promise<void>;
  updateQuantity: (id: string, quantity_item: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  removeAllItems: (id: string) => Promise<void>;
  setItemCount: (count: number) => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartUsed: "",
  items: [],
  itemCount: 0,

  // Función para obtener el conteo del carrito
  fetchCartItemCount: async (client_id: string) => {
    try {
      const response = await axiosInstance.get("/api/carts", {
        params: { client_id },
      });

      const cart_items = (response.data.cart_items || []).map(
        (item: CartItem) => ({
          ...item,
          quantity_item: item.quantity_item ?? 1,
        })
      );

      const total_items = cart_items.reduce(
        (acc, i) => acc + i.quantity_item,
        0
      );

      set({
        cartUsed: response.data.cart,
        items: cart_items,
        itemCount: total_items,
      });
    } catch (error) {
      console.error("Error al obtener el número de ítems:", error);
    }
  },

  updateQuantity: async (id, quantity_item) => {
    try {
      await axiosInstance.put(`/api/carts/items/${id}`, { quantity_item });

      const updated_items = get().items.map((item) =>
        item.id === id ? { ...item, quantity_item } : item
      );

      const total_items = updated_items.reduce(
        (acc, i) => acc + i.quantity_item,
        0
      );

      set({ items: updated_items, itemCount: total_items });
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  },

  removeItem: async (id) => {
    try {
      await axiosInstance.delete(`/api/carts/items/${id}`);
      const filtered = get().items.filter((i) => i.id !== id);
      const total_items = filtered.reduce((acc, i) => acc + i.quantity_item, 0);
      set({ items: filtered, itemCount: total_items });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  },

  removeAllItems: async (cart_id) => {
    try {
      await axiosInstance.delete(`api/carts/${cart_id}`);
      set({ items: [], itemCount: 0 }); // limpia todo el estado local
    } catch (error) {
      console.error("Error al eliminar los productos:", error);
    }
  },

  setItemCount: (count) => set({ itemCount: count }),
  getTotalPrice: () =>
    get().items.reduce((acc, i) => acc + i.price_product * i.quantity_item, 0),
}));
