'use client' ;
import React, { useEffect, useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {XIcon} from 'lucide-react';
import CartItem from './CartItem';
import CartFooter from './CartFooter';
import { useHydratedStore } from '@/app/hooks/useHyderatedStore';
import useCartStore from '@/app/store/CartStore';


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
              layout
              key={'cart-sidebar'}
              initial={{opacity: 0, x: '100%'}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: '100%'}}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ zIndex : 50}}
              className='flex flex-col bg-white dark:text-white dark:bg-black md:w-1/2 sm:w-3/5 w-full max-w-[450px] 
              h-screen fixed max-h-svh overflow-y-auto right-0 top-0 transition-[width] duration-300 '
            >

              <div className='w-full p-3 pb-0 justify-between flex' >
                <span className='text-2xl font-semibold'>Cart</span>
                <XIcon className='size-8 p-1 fill-white' 
                  strokeWidth={2} 
                  onClick={closeCart} 
                />
              </div>
              {/* <div className=' border-t-2 border-white w-full p-4'/> */}
              
              {items.map((item) => {
                if(item){
                return (<CartItem key={item?.id} item={item} />)
                }}
              )}
              {items.length > 0 ? <CartFooter /> : (
                <div className='text-2xl  top-1/12 w-full absolute text-center tracking-wide font-mont p-4'> 
                  No Products in cart yet..😭
                </div> 
              ) }
              
            </motion.div>
          </>
        )}
      </AnimatePresence>
  )
}

export default CartSidebar