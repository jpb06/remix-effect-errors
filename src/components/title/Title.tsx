import type { PropsWithChildren } from 'react';
import { match } from 'ts-pattern';

import type { PropsWithClassName } from '../../types/props-with-classname.type';

type TitleProps = {
  size: 'xl' | '2xl' | '3xl';
};

export const Title = ({
  size,
  children,
  className,
}: PropsWithClassName<PropsWithChildren<TitleProps>>) => {
  const textSize = match(size)
    .with('xl', () => 'text-xl')
    .with('2xl', () => 'text-2xl')
    .with('3xl', () => 'text-3xl')
    .exhaustive();

  return <h1 className={`${textSize} text-white ${className}`}>{children}</h1>;
};
