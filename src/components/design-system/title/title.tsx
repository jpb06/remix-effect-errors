import { cx } from '@panda/css';
import type { PropsWithChildren } from 'react';

import type { PropsWithClassName } from '@types';

import { type TitleSize, titleStyles } from './title.styles';

type TitleProps = PropsWithChildren<
  PropsWithClassName<{
    size: TitleSize;
  }>
>;

export const Title = ({ size, children, className }: TitleProps) => {
  const css = titleStyles({
    size,
  });

  return <h1 className={cx(css.root, className)}>{children}</h1>;
};
