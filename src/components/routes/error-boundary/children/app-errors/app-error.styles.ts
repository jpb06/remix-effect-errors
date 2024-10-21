import { sva } from '@panda/css';

export const appErrorStyles = sva({
  slots: ['root'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
  },
});
