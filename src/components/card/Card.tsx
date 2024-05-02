import type { PropsWithChildren } from 'react';

import type { PropsWithClassName } from '../../types/props-with-classname.type';
import { MotionContainer } from '../motion-container/MotionContainer';

export const Card = ({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) => (
  <MotionContainer
    className={`card mx-10 w-auto bg-gradient-to-tl from-indigo-950 to-cyan-900 shadow-xl md:mx-0 md:w-[52rem] ${className}`}
  >
    <div className="card-body">{children}</div>
  </MotionContainer>
);
