'use client';
import {ShoppingCartIcon,ShoppingBagIcon, User2Icon, MenuIcon, XIcon, MoonStarIcon, SunIcon,} from 'lucide-react';
import '../globals.css';
import {AnimatePresence, motion, useScroll, useTransform} from 'framer-motion';
import { useEffect, useState } from 'react';
import {useTheme} from 'next-themes';

function Header() {
  const {theme, setTheme} = useTheme();
  const {scrollY} = useScroll();

  const [isDesktop, setIsDesktop] = useState(null);  
  const [menuListVisible, setMenuListVisible] = useState(false);
  const [isCartOpen , setIsCartOpen] = useState(false);

  const backgroundColor = useTransform(scrollY, [0, 400], ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  console.log(isDesktop);
  
  if(isDesktop === null) return null; 

  const ToggleMenuList = () => {
    setMenuListVisible(prev => !prev) ;
  }

  return (
    <motion.header  
    style={{ backgroundColor: backgroundColor }} 
    className="w-full px-6 flex items-center fixed top-0 left-0 justify-between h-14 bg-gradient-to-b from-black/70 via-black/50 to-transparent duration-200 z-50 " 
    >
      <div className="flex items-center md:pt-4 p-2  truncate gap-2 text-white bg-clip-text  font-billabong md:text-5xl text-4xl tracking-wider font-extralight duration-200 transition-all"> 
        Matching Center 
      </div>

      <div className="flex items-center  ">
      <div className='mr-4'>
        {/* Menu Items */}
        <AnimatePresence>
          {isDesktop && (
          <motion.div
            key={'header-menu-items'}
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -50}}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex items-center justify-end gap-6 text-white font-semibold  text-md"
          >
            <div>Fabrics</div>
            <div>Collections</div>
            <div>On Sale</div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>

        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 
            <MoonStarIcon className="size-6 md:size-6 fill-white mr-4"  strokeWidth={1} /> 
            : 
            <SunIcon className="size-6 md:size-6 fill-white mr-4"  strokeWidth={1} />
          }
        </button>

        <User2Icon className="size-6 md:size-6 fill-white mr-4"  strokeWidth={0} />
        
        <ShoppingCartIcon className="size-6 md:size-6 fill-white text-white mr-4 md:mr-0 duration-500" 
        onClick={() => setIsCartOpen(prev => !prev)}
        />
        
        {/* Menu Icon */}
        <AnimatePresence>
          {!isDesktop && (
          <motion.div
            key="header-menu-icon"
            initial={{opacity: 0, width: '0px',}}
            animate={{opacity: menuListVisible ? 0.5 : 1, width: '25px'}}
            exit={{opacity: 0, width: '0px'}}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={ToggleMenuList}
          >
            <MenuIcon className="size-6 md:size-6 text-white" strokeWidth={3} />
          </motion.div>
        )}
        </AnimatePresence>
      </div>
      {/* Menu List */}
      <AnimatePresence>
        {!isDesktop && menuListVisible && (
          <motion.div
            key="header-menu-list"
            initial={{opacity: 0, y: -50, top: '0px'}}
            animate={{opacity: 1, y: 0, top: '3.5rem'}}
            exit={{opacity: 0, y: -50 , top: '0px'}}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
            className="flex flex-col absolute w-full left-0 shadow-lg"
          >
            <div className="text-center gap-2 p-2 hover:bg-black  text-white font-light text-md px-2 duration-200">
              Fabrics
            </div>
            <div className="text-center gap-2 p-2 text-white font-light text-md hover:bg-black px-2 duration-200  ">
              Collections
            </div>
            <div className="text-center p-2 text-white font-light text-md hover:bg-black px-2 duration-200  ">
              On Sale
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cart Sidebar */}
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
              onClick={() => setIsCartOpen(false)}
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
                <XIcon className='size-8 p-1 fill-white' strokeWidth={2} onClick={() => setIsCartOpen(false)} />
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
              

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header;