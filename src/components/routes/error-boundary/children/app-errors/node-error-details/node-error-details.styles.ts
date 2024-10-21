import { sva } from '@panda/css';

export const nodeErrorDetailsStyles = sva({
  slots: ['stack'],
  base: {
    stack: {
      borderLeftWidth: '2px',
      borderColor: 'red.600',
      paddingLeft: '0.5rem',
    },
  },
});
