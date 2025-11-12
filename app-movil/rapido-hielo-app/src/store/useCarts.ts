import { Cart, CartItem } from "@/types/Cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: Cart | null;
  cart_items: CartItem[];
  set_cart: (cart: Cart) => void;
  add_item: (item: CartItem) => void;
  remove_item: (id: string) => void;
  clear_cart: () => void;
  update_item_status: (id: string, status: "active" | "desactive") => void;
  recalculate_totals: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      cart_items: [],

      set_cart: (cart) => set({ cart }),

      add_item: (item) => {
        const items = [...get().cart_items];
        const exists = items.find((i) => i.id === item.id);
        if (!exists) items.push(item);
        const totals = calculate_totals(items);
        set({
          cart_items: items,
          cart: get().cart
            ? { ...get().cart!, ...totals }
            : {
                id: crypto.randomUUID(),
                fk_client_id: item.fk_cart_id,
                status: "active",
                ...totals,
                items: totals.items,
              },
        });
      },

      remove_item: (id) => {
        const items = get().cart_items.filter((i) => i.id !== id);
        const totals = calculate_totals(items);
        set({
          cart_items: items,
          cart: get().cart ? { ...get().cart!, ...totals } : null,
        });
      },

      update_item_status: (id, status) => {
        const items = get().cart_items.map((i) =>
          i.id === id ? { ...i, status } : i
        );
        const totals = calculate_totals(items);
        set({
          cart_items: items,
          cart: get().cart ? { ...get().cart!, ...totals } : null,
        });
      },

      clear_cart: () => set({ cart: null, cart_items: [] }),

      recalculate_totals: () => {
        const totals = calculate_totals(get().cart_items);
        set({
          cart: get().cart ? { ...get().cart!, ...totals } : null,
        });
      },
    }),
    { name: "cart-storage" }
  )
);

function calculate_totals(items: CartItem[]) {
  const active_items = items.filter((i) => i.status === "active");
  const total = active_items.reduce((sum, i) => sum + i.price_product, 0);
  return { total, items: active_items.length };
}
