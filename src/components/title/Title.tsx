import type { PropsWithChildren } from 'react';

export const Title = ({ children }: PropsWithChildren) => (
  <h1 className="text-3xl text-white">{children}</h1>
);
