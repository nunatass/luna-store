import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
export const useSticky = () => {
  const [sticky, setSticky] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setSticky(latest > 80);
  });

  return { sticky };
};
