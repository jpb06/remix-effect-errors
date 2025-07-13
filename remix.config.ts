import type { AppConfig } from '@remix-run/dev';

const remixConfig: AppConfig = {
  appDirectory: 'src',
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['**/.*', '**/*.test.{ts,tsx}'],
  // serverModuleFormat: 'cjs',
  watchPaths: ['./src/**/*'],
};

// biome-ignore lint/style/noDefaultExport: remix
export default remixConfig;
