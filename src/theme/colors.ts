import { defineSemanticTokens } from '@pandacss/dev';

export const colors = defineSemanticTokens.colors({
  background: {
    primary: { value: '{colors.sky.700}' },
    secondary: { value: '{colors.indigo.700}' },
    neutral: { value: '{colors.zinc.600}' },
    info: { value: '{colors.blue.500}' },
    error: { value: '{colors.red.600}' },
    warning: { value: '{colors.yellow.500}' },
    success: { value: '{colors.green.600}' },
  },
  content: {
    primary: { value: '{colors.neutral.200}' },
    secondary: { value: '{colors.neutral.100}' },
    neutral: { value: '{colors.stone.50}' },
  },
});
