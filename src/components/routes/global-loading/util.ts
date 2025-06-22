import type { Navigation } from '@remix-run/react';

export const getProgressState = (
  { state }: Navigation,
  animationComplete: boolean,
) => {
  if (state !== 'idle') {
    return state;
  }

  if (animationComplete) {
    return 'hidden';
  }

  return 'completed';
};
