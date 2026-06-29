'use client';
import {AnimatePresence, motion} from 'framer-motion';
import { useEffect, useState } from "react";

const images = [
  {src: '/fabrics_sew.webp', alt: 'fabrics'},
  {src: '/fabrics_2.jpg', alt: 'fabrics'},
  {src: '/fabrics_3.webp', alt: 'fabrics'},
]

function TopBanner() {
  const [index, setIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex( prev => prev === images.length-1 ? 0 : prev + 1);
    }, 6000)

    return () => clearInterval(interval);
  }, []);


  return (
    <AnimatePresence mode="sync">
      {/* <Image src={'/fabrics_sew.webp'} alt="fabrics" fill className=" object-cover brightness-75 w-auto h-auto "   /> */}
      <motion.img key={index}
        initial={{opacity : 0 , scale : 1}}
        animate={{opacity : 1 , scale : 1.08}}
        exit={{opacity : 0, scale: 1 }}
        transition={{
          opacity: {duration: 2, ease: 'easeInOut'},
          scale: {duration: 6, ease: 'easeInOut'}
          }}
        className='absolute top-0 left-0 w-full h-full object-cover brightness-75 z-0'
        src={images[index].src}
      >

      </motion.img>
    </AnimatePresence>
  )
}

export default TopBanner