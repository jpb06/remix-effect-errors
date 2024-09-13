import { Link, LinkProps, useLocation, useMatches } from '@remix-run/react';
import { FunctionComponent } from 'react';
import { AppBarLinkSize, appBarLinkStyles } from './app-bar-link.styles';

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
