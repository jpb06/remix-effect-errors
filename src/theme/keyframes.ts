import pandaPreset from '@pandacss/preset-panda';

export const keyframes = {
  ...pandaPreset.theme.keyframes,
  'skeleton-pulse': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.5,
    },
    '100%': {
      opacity: 1,
    },
  },
};
