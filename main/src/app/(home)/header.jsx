'use client';
import {ShoppingCartIcon,ShoppingBagIcon, User2Icon, MenuIcon,} from 'lucide-react';
import '../globals.css';

function Header() {

  return (
    <header className="w-full p-4 pt-8 sm:p-8 flex items-center fixed top-0 left-0 justify-between h-12 bg-gradient-to-b from-black/70 via-black/50 to-transparent duration-200 z-50 ">
      <div className="flex items-center gap-2 text-white font-billabong sm:text-5xl text-4xl tracking-wider font-extralight">
        Matching Center
      </div>
      <div className="flex items-center gap-4">
        <User2Icon className="size-6 sm:size-7 fill-white" strokeWidth={0} />
        
        <ShoppingCartIcon className="size-6 sm:size-7 fill-white" />
        <MenuIcon className="size-6 sm:size-7" strokeWidth={3} />
      </div>
    </header>
  )
}

export default Header;