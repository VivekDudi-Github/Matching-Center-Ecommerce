"use client";
import useCartStore  from "@/app/store/CartStore"
import { api } from "../lib/axios";


export const updateCartStore = async() => {
  let oldCart = [];
  try {
    const items = useCartStore.getState().items;
    oldCart = items;

    const newProds = [];

    if(items.length > 0) {
      const res = await api.get(`/cart?items=${items.map(i => i.id).join(',')}`);
      const data = res.data;
      useCartStore.getState().clearCart();
      if(!data.length) return ;


      data.forEach((pro) => {
        const item = items.find(i => i.id === pro.id);
        const newColor = pro.color;

        newColor.forEach((c) => {
          const oldColor = item.color.find(oc => oc.id === c.id);
          if(oldColor) {
            c.quantity = oldColor.quantity;
          } else {
            c.quantity = 0;
          }
        });

        newProds.push({
          ...pro,
          color: newColor,
        });
      })


      useCartStore.getState().setItems(newProds);
      return;
    }
  } catch (error) {
    useCartStore.getState().clearCart();
    useCartStore.getState().setItems(oldCart);
    console.error("Error updating cart:", error);
  }
}
