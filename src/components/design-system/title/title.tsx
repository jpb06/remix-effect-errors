import type { FunctionComponent, PropsWithChildren } from 'react';

import { cx } from '@panda/css';
import type { PropsWithClassName } from '@types';

import { type TitleSize, titleStyles } from './title.styles';

type TitleProps = PropsWithChildren<
  PropsWithClassName<{
    size: TitleSize;
  }>
>;

export const Title: FunctionComponent<TitleProps> = ({
  size,
  children,
  className,
}) => {
  const css = titleStyles({
    size,
  });

  return <h1 className={cx(css.root, className)}>{children}</h1>;
};
