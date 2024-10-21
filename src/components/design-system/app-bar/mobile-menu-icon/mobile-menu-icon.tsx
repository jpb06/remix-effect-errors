import { motion } from 'framer-motion';
import type { FunctionComponent, PropsWithChildren } from 'react';

type MobileMenuIconProps = FunctionComponent<
  PropsWithChildren<{
    key?: number;
    rotate: number;
  }>
>;

export const MobileMenuIcon: MobileMenuIconProps = ({
  children,
  key,
  rotate,
}) => (
  <motion.div
    key={key}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, rotate }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);
