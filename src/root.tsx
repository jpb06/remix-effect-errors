import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { ErrorBoundary as Boundary } from './components/error-boundary/ErrorBoundary';
import { Menu } from './components/menu/Menu';

import stylesheet from '~/tailwind.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const ErrorBoundary = Boundary;

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang="en"
    className="animate-fade-in hero min-h-screen"
    style={{
      background: 'linear-gradient(125deg, #2e1065 0%, #1e1b4b 45%, #0c4a6e)',
    }}
  >
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="darkreader-lock" />
      <Meta />
      <Links />
    </head>
    <body className="flex h-full w-full flex-col items-center pt-6">
      <Menu />
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

export default function App() {
  return <Outlet />;
}
