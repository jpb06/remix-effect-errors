import { type MotionStyle, motion } from 'framer-motion';
import type { FunctionComponent, PropsWithChildren } from 'react';

import type { PropsWithClassName } from '@types';

import { defaultTransition } from './logic/default-transition.logic';

type MotionContainerProps = PropsWithClassName<PropsWithChildren> & {
  style?: MotionStyle;
};

export const MotionContainer: FunctionComponent<MotionContainerProps> = ({
  className,
  style,
  children,
}) => (
  <motion.div
    whileHover={{ scale: 1.011 }}
    transition={defaultTransition}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);
