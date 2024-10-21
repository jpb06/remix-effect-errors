import { Link as RemixLink } from '@remix-run/react';
import type { FunctionComponent, PropsWithChildren } from 'react';

import { linkStyles } from './link.styles';

type LinkProps = FunctionComponent<
  PropsWithChildren<{
    href: string;
  }>
>;

export const Link: LinkProps = ({ href, children }) => {
  const css = linkStyles();

  return (
    <RemixLink className={css.root} to={href}>
      {children}
    </RemixLink>
  );
};
