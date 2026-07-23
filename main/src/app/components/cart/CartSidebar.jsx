'use client' ;
import React, { useEffect, useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {XIcon} from 'lucide-react';
import CartItem from './CartItem';
import CartFooter from './CartFooter';
import { useHydratedStore } from '@/app/hooks/useHyderatedStore';
import useCartStore from '@/app/store/CartStore';

// const items = [{
//   price : 100,
//   name : 'test',
//   image : 'https://images.unsplash.com/photo-1678489811694-4d06d9d76ff1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
//   color : 'red',
//   quantity : 1,
//   id : 1
// }]

function CartSidebar({openChange}) {
  const hyderated = useHydratedStore();
  const [isCartOpen, setIsCartOpen]  = useState(false);
  const items = useCartStore(s => s.items);

  const closeCart = () => {
    setIsCartOpen(false);
  }

  useEffect(() => {
    setIsCartOpen(openChange);
  }, [openChange]);

  return (
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              key={'background-cart-overlay'}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex : 40}}
              className='w-full h-screen fixed inset-0'
              onClick={closeCart }
            >
            </motion.div>
            <motion.div
              key={'cart-sidebar'}
              initial={{opacity: 0, x: '100%'}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: '100%'}}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ zIndex : 50}}
              className='flex flex-col bg-white dark:text-white dark:bg-black w-1/2 max-w-96 h-screen fixed  right-0 top-0 ' 
            >

              {/* <div className='text-3xl font-semibold top-1/12 absolute text-center tracking-wide font-sans p-4'> 
                No Products in cart yet..😭
              </div> */}
              <div className='w-full p-3 pb-0 justify-end flex' >
                <XIcon className='size-8 p-1 fill-white' 
                  strokeWidth={2} 
                  onClick={closeCart} 
                />
              </div>
              <div className='flex justify-between items-center gap-4 p-4'>
                <div className='flex flex-col gap-2'>
                  <div className='text-xl font-semibold'>Cart</div>
                  <div className='text-sm font-light'>Total MRP</div>
                  <div className='text-sm font-light'>Offered Price</div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='text-xl font-semibold'>2 Items</div>
                  <div className='text-sm font-light'>$0.00</div>
                  <div className='text-sm font-light'>$0.00</div>
                </div>
              </div>
              <div className=' border-t-2 border-white w-full p-4'/>
              
              {items.map((item) => {
                if(item){
                return (<CartItem key={item?.id} item={item} />)
                }}
              )}
              <CartFooter />
              
            </motion.div>
          </>
        )}
      </AnimatePresence>
  )
}

export default CartSidebar