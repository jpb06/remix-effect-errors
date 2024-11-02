import { sva } from '@panda/css';

export const errorBoundarySummaryStyles = sva({
  slots: ['root', 'errors', 'icon'],
  base: {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    errors: {
      alignContent: 'center',
      fontSize: '1.55rem',
      lineHeight: '1.75rem',
      justifyContent: 'space-between',
    },
    icon: {
      width: '3.5rem',
      height: '3.5rem',
    },
  },
});
