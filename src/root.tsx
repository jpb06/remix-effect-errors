import { cssBundleHref } from '@remix-run/css-bundle';
import { Outlet } from '@remix-run/react';
import type { LinksFunction } from '@vercel/remix';

import { ErrorBoundary as AppErrorBoundary } from '@components/routes/error-boundary';
import { AppLayout } from './components/design-system/app-layout';
import pandaStyles from './index.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: pandaStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const ErrorBoundary = AppErrorBoundary;

export const Layout = AppLayout;

const App = () => <Outlet />;

export default App;
