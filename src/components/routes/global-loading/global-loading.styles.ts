import { sva } from '@panda/css';

export const globalLoadingStyles = sva({
  slots: ['root', 'progressBar'],
  base: {
    root: {
      position: 'fixed',
      insetX: 0,
      top: 0,
      left: 0,
      zIndex: 80,
      height: 1,
      animationStyle: 'skeleton-pulse',
    },
    progressBar: {
      height: '100%',
      bgLinear: 'to-tr',
      gradientFrom: 'cyan.300',
      gradientTo: 'blue.400',
      transition: 'all 500ms ease-in-out',
    },
  },
  variants: {
    state: {
      hidden: {
        progressBar: {
          width: 0,
          opacity: 0,
          transition: 'none',
        },
      },
      completed: {
        progressBar: {
          width: '100%',
        },
      },
      loading: {
        progressBar: {
          width: '10/12',
        },
      },
      submitting: {
        progressBar: {
          width: '4/12',
        },
      },
    },
  },
});
