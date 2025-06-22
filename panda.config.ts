import pandaPreset from '@pandacss/preset-panda';

import { defineConfig } from '@pandacss/dev';
import { colors } from '@theme/colors';
import { keyframes } from '@theme/keyframes';
import { animationStyles } from '@theme/animation-styles';

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
      animationStyles
    },
  },
  outdir: 'styled-system',
});
