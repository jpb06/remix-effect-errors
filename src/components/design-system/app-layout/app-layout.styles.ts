import { sva } from '@panda/css';

export const appLayoutStyles = sva({
  slots: ['html', 'body'],
  base: {
    html: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      bgGradient: 'to-tr',
      gradientFrom: '#2e1065',
      gradientVia: '#1e1b4b',
      gradientViaPosition: '45%',
      gradientTo: '#0c4a6e',
      minHeight: '100vh',
    },
    body: {
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
