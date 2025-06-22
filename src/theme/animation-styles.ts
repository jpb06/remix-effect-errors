import { defineAnimationStyles } from '@pandacss/dev';

export const animationStyles = defineAnimationStyles({
  'skeleton-pulse': {
    value: {
      animationName: 'skeleton-pulse',
      animationDuration: '1200ms',
      animationTimingFunction: '{easings.pulse}',
      animationIterationCount: 'infinite',
      animationDirection: 'alternate',
    },
  },
});
