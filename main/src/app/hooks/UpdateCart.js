"use client";
import useCartStore  from "@/app/store/CartStore"
import { exfn } from "./extractActions";
import { updateCartController } from "../lib/controller/updateCart";


export const updateCartStore = async() => {
  let oldCart = [];
  try {
    const items = useCartStore.getState().items;
    oldCart = items;

    const newProds = [];

    if(items.length > 0) {
      const res = await exfn(() => updateCartController(items.map(i => i.id)));
      useCartStore.getState().clearCart();
      if(!res.length) return ;

      
      res.forEach((pro) => {
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
