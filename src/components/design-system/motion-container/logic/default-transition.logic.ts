import type { Transition } from 'framer-motion';

export const defaultTransition: Transition = {
  duration: 0.3,
  type: 'spring',
  stiffness: 400,
  damping: 17,
};
