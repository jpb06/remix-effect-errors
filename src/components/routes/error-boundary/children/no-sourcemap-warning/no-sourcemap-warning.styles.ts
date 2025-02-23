import { sva } from '@panda/css';

export const noSourcemapWarningStyles = sva({
  slots: ['title', 'icon'],
  base: {
    title: {
      display: 'flex',
      placeItems: 'end',
    },
    icon: {
      width: '3.5rem',
      height: '3.5rem',
      marginRight: '0.5rem',
    },
  },
});
