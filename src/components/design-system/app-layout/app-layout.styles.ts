import { sva } from '@panda/css';

export const appLayoutStyles = sva({
  slots: ['html', 'content'],
  base: {
    html: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      bgColor: 'gray.800',
      minHeight: '100vh',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      paddingX: '0.5rem',
      md: {
        paddingX: 0,
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
      paddingTop: 6,
    },
  },
});
