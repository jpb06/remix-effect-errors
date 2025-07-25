import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { vercelPreset } from '@vercel/remix/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

// biome-ignore lint/style/noDefaultExport: vite
export default defineConfig({
  build: {
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    copyPublicDir: true,
  },
  plugins: [
    remix({
      presets: [vercelPreset()],
      appDirectory: 'src',
    }),
    tsconfigPaths(),
    Icons({
      compiler: 'jsx',
      autoInstall: true,
    }),
  ],
});
