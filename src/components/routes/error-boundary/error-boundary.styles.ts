import { sva } from '@panda/css';

export const errorBoundaryStyles = sva({
  slots: ['root'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginBottom: '0.5rem',
    },
  },
});
