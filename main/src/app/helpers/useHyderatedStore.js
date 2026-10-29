'use client';
import { useState, useEffect } from 'react';

export function useHydratedStore() {
  const [isHyderated, setIsHyderated] = useState(false);

  useEffect(() => {
    setIsHyderated(true);
  }, []);

  return isHyderated;
}
