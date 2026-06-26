'use client'
import React, { useEffect, useRef, useState } from 'react'
import ShopNowBtn from './ShopNowBtn'
import Image from 'next/image' ;
import {animate, motion, useMotionValue} from 'framer-motion';

const discoversItems = [
  {name: 'Fabrics', img: '/dis_1.webp', alt: 'fabrics'},
  {name: 'Fabrics', img: '/dis_2.webp', alt: 'fabrics'},
  {name: 'Fabrics', img: 'https://static.vecteezy.com/system/resources/thumbnails/051/567/202/small/a-collection-of-vibrant-fabric-swatches-displayed-in-a-clean-and-minimalist-manner-the-solid-colors-vary-in-texture-creating-an-appealing-visual-arrangement-for-design-inspiration-photo.jpg', alt: 'fabrics'},
  {name: 'Fabrics', img: '/dis_1.webp', alt: 'fabrics'},
  {name: 'Fabrics', img: '/dis_2.webp', alt: 'fabrics'},
  {name: 'Fabrics', img: 'https://static.vecteezy.com/system/resources/thumbnails/051/567/202/small/a-collection-of-vibrant-fabric-swatches-displayed-in-a-clean-and-minimalist-manner-the-solid-colors-vary-in-texture-creating-an-appealing-visual-arrangement-for-design-inspiration-photo.jpg', alt: 'fabrics'},

]

function DiscoverTab() {
  const duplicateItems = [...discoversItems, ...discoversItems];
  const containerRef = useRef();
  const xTranslation = useMotionValue(0);


  useEffect(() => {
    let controls;
    const animateFn = () => {
      if (!containerRef.current) return;

      const totalWidth = containerRef.current.scrollWidth;    
      const singleListWidth = totalWidth / 2;

      // 3. Drive the animation smoothly using raw pixels instead of guessing percentages
      controls = animate(xTranslation, [0, -singleListWidth], {
        ease: 'linear',
        duration: 10,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      });

    }
    if(containerRef.current) {
      animateFn();
    }
    window.addEventListener('resize', animateFn);

    return () => {
      controls.stop();
      window.removeEventListener('resize', animateFn);
    }
  }, [xTranslation]);


  return (
    <div className='dark:bg-black dark:text-white text-black w-full mb-3'>
      <h3 className='md:text-4xl text-3xl font-mont text-white  p-4 w-full text-center duration-200'> 
        Discover Our Catagories
      </h3>

      <div className='w-full gap-4 p-4  overflow-hidden'>  
        <motion.div
          className='flex gap-4 w-max'
          style={{x : xTranslation}}
          ref={containerRef}
        >
          {duplicateItems.map( (d ,i) => (
            <div key={i} className='relative w-56 md:w-80 shrink-0 '> 
              <img width={100} height={384} className=' w-full h-96 brightness-75 object-cover'  
              src={d.img} alt={d.alt} 
              />
              <span className='absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-8 font-bold font-mont text-3xl text-nowrap ' >Fabrics </span>        
              <div className='absolute inset-0 inset-y-1/2 '><ShopNowBtn /></div>
            </div>
          ))}
        </motion.div>
      </div>
      
      
    </div>
  )
}

export default DiscoverTab