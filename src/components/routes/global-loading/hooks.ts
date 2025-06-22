import { useEffect, useRef, useState } from 'react';

export const useAnimationCompleted = (isActive: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(true);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isActive) {
      setAnimationComplete(false);
    }

    Promise.allSettled(
      ref.current.getAnimations().map(({ finished }) => finished),
    ).then(() => !isActive && setAnimationComplete(true));
  }, [isActive]);

  return { animationComplete, ref };
};
