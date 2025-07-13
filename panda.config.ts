import { defineConfig } from '@pandacss/dev';
import pandaPreset from '@pandacss/preset-panda';

import { animationStyles } from '@theme/animation-styles';
import { colors } from '@theme/colors';
import { keyframes } from '@theme/keyframes';

// biome-ignore lint/style/noDefaultExport: panda
export default defineConfig({
  preflight: true,
  jsxFramework: 'react',
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  presets: [pandaPreset],
  theme: {
    extend: {
      semanticTokens: { colors },
      keyframes,
      animationStyles,
    },
  },
  outdir: 'styled-system',
});
