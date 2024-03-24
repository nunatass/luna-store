import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
export const useSticky = (offset = 80) => {
  const [sticky, setSticky] = useState(false);
  const [position, setPosition] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setSticky(latest > offset);
    setPosition(latest);
  });

  return { sticky, position };
};
