import type { LinkProps } from '@remix-run/react';
import { Link, useLocation } from '@remix-run/react';
import type { FunctionComponent } from 'react';

import type { AppBarLinkSize } from './app-bar-link.styles';
import { appBarLinkStyles } from './app-bar-link.styles';

type AppBarLinkProps = LinkProps & {
  size?: AppBarLinkSize;
};

export const AppBarLink: FunctionComponent<AppBarLinkProps> = ({
  children,
  size = 'narrow',
  ...props
}) => {
  const location = useLocation();
  const isCurrentRoute = props.to !== '/' && location.pathname === props.to;

  const css = appBarLinkStyles({
    size,
    state: isCurrentRoute ? 'selected' : 'default',
  });

  return (
    <Link {...props} className={css.root}>
      {children}
    </Link>
  );
};
