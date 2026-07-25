'use client'

import { useEffect, useState } from "react"


function HyderationWrapper({children, skeleton}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) return skeleton ?? null;
  return (
    <>{children}</>
  )
}

export default HyderationWrapper