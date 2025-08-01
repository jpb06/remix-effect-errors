import { Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import type { FunctionComponent, PropsWithChildren } from 'react';

import { GlobalLoading } from '../../routes/global-loading/global-loading';
import { AppBar } from '../app-bar';
import { appLayoutStyles } from './app-layout.styles';

export const AppLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const css = appLayoutStyles();

  return (
    <html lang="en" className={css.html}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="darkreader-lock" />
        <Meta />
        <Links />
      </head>
      <body>
        <GlobalLoading />
        <div className={css.content}>
          <AppBar />
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};
