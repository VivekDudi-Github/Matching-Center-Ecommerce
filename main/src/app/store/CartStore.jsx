'use client';
import { color } from "framer-motion";
import { create } from "zustand";
import {persist} from "zustand/middleware";

const SHIPPING = 80;
const FREE_SHIPPING_ABOVE = 2000;

const useCartStore = create(
  persist (
    (set, get) => ({
    items: [],

    addItem: (product) =>
      set((state) => {
        const existing = state.items.find((i) => i.id === product.id);
        if (existing) {
          return {
            items: state.items
          };
        }

        return {
          items: [...state.items, {
            ...product,
            color: product.color.map(c => ({
              ...c,
              quantity: 0,
            })),
          }],
        };
      }),

    updateQuantity: (id,colorId, quantity) =>
      set((state) => ({
        items: state.items.map((item) =>{
          if(item.id === id) {
            const colors = item.color;
            const idx = item.color.findIndex(c => c.id === colorId);
            if(colors[idx]) {
              colors[idx].quantity = quantity;
            }
            
            return {...item, color: [...colors]};
            } else {
              return item;
          }
        }),
      })),

    getItem: (id) => get().items.find((item) => item.id === id),
    
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


export const getTotalQuantity = (state, itemId) => {
  const item = state.items.find((i) => i.id === itemId);
  return item.color.reduce((sum, color) => sum + (Number(color.quantity)|| 0), 0);
};

export const selectTotal = (state) =>
  state.items.reduce(
    (sum, item) => sum + item.price * getTotalQuantity(state, item.id),
    0
  );

export const selectSubtotal = (state) =>
  state.items.reduce(
    (sum, item) => sum + item.originalPrice * getTotalQuantity(state, item.id),
    0
  );

export const selectShipping = (state) => {
  const total = selectTotal(state);
  return total >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING;
};

export const selectDiscount = (state) => {
  return selectSubtotal(state) - selectTotal(state) ;
};

export const getCartItem = (state, id) =>
  state.items.find((item) => item.id === id);

export const selectTotalItems = (state) =>
  state.items.length;