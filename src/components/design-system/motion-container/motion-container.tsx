import { motion } from 'framer-motion';
import type { FunctionComponent, PropsWithChildren } from 'react';

import type { PropsWithClassName } from '@types';

import { defaultTransition } from './logic/default-transition.logic';

type MotionContainerProps = PropsWithClassName<PropsWithChildren>;

export const MotionContainer: FunctionComponent<MotionContainerProps> = ({
  className,
  children,
}) => (
  <motion.div
    whileHover={{ scale: 1.011 }}
    transition={defaultTransition}
    className={className}
  >
    {children}
  </motion.div>
);
