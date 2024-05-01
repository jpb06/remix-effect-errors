import type { PropsWithChildren } from 'react';

import { MotionContainer } from '../motion-container/MotionContainer';

export const Card = ({ children }: PropsWithChildren) => (
  <MotionContainer className="card mx-10 w-auto bg-gradient-to-tl from-indigo-950 to-cyan-900 shadow-xl md:mx-0 md:w-[52rem]">
    <div className="card-body">{children}</div>
  </MotionContainer>
);
