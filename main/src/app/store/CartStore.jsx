'use client';
import { create } from "zustand";
import {persist} from "zustand/middleware";

const SHIPPING = 80;
const FREE_SHIPPING_ABOVE = 2000;

const useCartStore = create(
  persist (
    (set) => ({
    items: [],

    addItem: (product) =>
      set((state) => {
        const existing = state.items.find((i) => i.id === product.id);

        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === product.id
                ? {
                    ...i,
                    quantity: i.quantity + product.quantity,
                  }
                : i
            ),
          };
        }

        return {
          items: [...state.items, product],
        };
      }),

    updateQuantity: (id, quantity) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Number(quantity),
              }
            : item
        ),
      })),


    removeItem: (id) =>
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

    clearCart: () => set({ items: [] }),
    }) ,
    {
      name : "cart",
    }
  ));

export default useCartStore;

export const selectSubtotal = (state) =>
  state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

export const selectShipping = (state) => {
  const subtotal = selectSubtotal(state);

  return subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING;
};

export const selectTotal = (state) =>
  selectSubtotal(state) + selectShipping(state);

export const selectTotalItems = (state) =>
  state.items.length;