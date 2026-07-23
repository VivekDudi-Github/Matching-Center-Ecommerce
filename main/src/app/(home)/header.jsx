'use client';
import {ShoppingBagIcon, User2Icon, MenuIcon, XIcon, MoonStarIcon, SunIcon,} from 'lucide-react';
import '../globals.css';
import {AnimatePresence, motion, useScroll, useTransform} from 'framer-motion';
import { useEffect, useState } from 'react';
import {useTheme} from 'next-themes';
import Link from 'next/link';
import CartSideBar from '@/app/components/cart/CartSidebar';

function Header() {
  const {theme, setTheme} = useTheme();
  const {scrollY} = useScroll();

  const [isDesktop, setIsDesktop] = useState(null);  
  const [menuListVisible, setMenuListVisible] = useState(false);
  const [isCartOpen , setIsCartOpen] = useState(0);

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
      <Link href={'/'} className="inline-block font-billabong md:text-4xl text-4xl ">  
        <span className=' text-white'>     
          Matching Center 
        </span>
      </Link>

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
            <MoonStarIcon className="size-6 md:size-6 fill-white mr-4 text-white"  strokeWidth={1} /> 
            : 
            <SunIcon className="size-6 md:size-6 fill-white mr-4 text-white"  strokeWidth={1} />
          }
        </button>

        <Link href={'/admin'} className="inline-block">
          <User2Icon className="size-6 md:size-6 fill-white mr-4"  strokeWidth={0} />
        </Link>
        
        <ShoppingBagIcon className="size-6 md:size-6  text-white mr-4 md:mr-0 duration-500" 
        onClick={() => setIsCartOpen(prev => prev+1)}
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
      <CartSideBar openChange={isCartOpen} />
    </motion.header>
  )
}

export default Header;