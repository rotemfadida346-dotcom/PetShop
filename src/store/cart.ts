import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItemType } from "@/lib/types";
import { calculateSubscriptionPrice } from "@/lib/utils";

interface CartStore {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleSubscription: (
    id: string,
    isSubscription: boolean,
    intervalWeeks?: number
  ) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(
          (i) =>
            i.productId === item.productId &&
            i.isSubscription === item.isSubscription
        );

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === existing.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.id !== id) });
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },

      toggleSubscription: (id, isSubscription, intervalWeeks) => {
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, isSubscription, intervalWeeks } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.isSubscription
            ? calculateSubscriptionPrice(item.price, item.subscriptionDiscount)
            : item.price;
          return total + price * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "pawsome-cart",
    }
  )
);
