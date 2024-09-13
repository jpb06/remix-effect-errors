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
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      justifyContent: 'space-between',
    },
    icon: {
      width: '2.5rem',
      height: '2.5rem',
    },
  },
});
