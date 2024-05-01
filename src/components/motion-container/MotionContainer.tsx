import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import type { PropsWithClassName } from '../../types/props-with-classname.type';

import { defaultTransition } from './logic/default-transition.logic';

export const MotionContainer = ({
  className,
  children,
}: PropsWithClassName<PropsWithChildren>) => (
  <motion.div
    whileHover={{ scale: 1.011 }}
    transition={defaultTransition}
    className={className}
  >
    {children}
  </motion.div>
);
