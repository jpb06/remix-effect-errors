import { sva } from '@panda/css';

export const headerStyles = sva({
  slots: ['root', 'title'],
  base: {
    root: {
      opacity: 0.8,
      color: 'slate.200',
      fontWeight: 700,
      display: 'flex',
      paddingBottom: 2,
      width: "max-content"
    },
    title: {
      marginLeft: 1,
    },
  },
});
