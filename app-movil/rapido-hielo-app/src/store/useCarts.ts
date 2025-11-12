import { axiosInstance } from "@/axios/axiosInstance";
import { Cart, CartItem } from "@/types/Cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: Cart | null;
  cart_items: Partial<CartItem>[];
  getCart: (client_id: string) => void;
  set_cart: (cart: Cart) => void;
  add_item: (item: Partial<CartItem>, fk_client_id: string) => Promise<void>;
  /*   remove_item: (id: string) => void;
  clear_cart: () => void;
  update_item_status: (id: string, status: "active" | "desactive") => void;
  recalculate_totals: () => void; */
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      cart_items: [],

      getCart: async (client_id) => {
        let { cart, cart_items } = get();
        const data = await axiosInstance.get("api/carts", {
          params: { client_id: client_id },
        });
        cart = data.data.cart;
        set({ cart });
      },

      set_cart: (cart) => set({ cart }),

      add_item: async (item, client_id) => {
        let { cart, cart_items } = get();

        // 1. Buscar o crear carrito por cliente
        if (!cart) {
          const data = await axiosInstance.post("api/carts", {
            fk_client_id: client_id,
          });

          cart = data.data.cart;
          set({ cart });
        }

        // 2. Crear o actualizar ítem
        const res_item = await axiosInstance.post("api/carts/items", {
          fk_cart_id: cart.id,
          fk_product_id: item.fk_product_id,
          name_product: item.name_product,
          price_product: item.price_product,
          quantity: item.quantity,
        });

        console.log("no pasa");

        const new_item = res_item.data.item;

        // 3. Actualizar store local
        const exists = cart_items.find(
          (i) => i.fk_product_id === new_item.fk_product_id
        );

        const updated_items = exists
          ? cart_items.map((i) =>
              i.fk_product_id === new_item.fk_product_id ? new_item : i
            )
          : [...cart_items, new_item];

        const totals = calculate_totals(updated_items);
        set({
          cart_items: updated_items,
          cart: { ...cart, ...totals },
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
