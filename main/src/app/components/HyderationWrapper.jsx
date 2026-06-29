'use client'

import { useEffect, useState } from "react"


function HyderationWrapper({children}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) return null;
  return (
    <>{children}</>
  )
}

export default HyderationWrapper