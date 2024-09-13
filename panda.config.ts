import { defineConfig } from '@pandacss/dev';
import pandaPreset from '@pandacss/preset-panda';
import { colors } from '@theme/colors';

export default defineConfig({
  preflight: true,
  jsxFramework: 'react',
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  presets: [pandaPreset],
  theme: {
    extend: {
      semanticTokens: { colors },
      //keyframes: keyframes,
    },
  },
  outdir: 'styled-system',
});
