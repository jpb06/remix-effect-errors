import { sva } from '@panda/css';

export const effectErrorDetailsStyles = sva({
  slots: ['root', 'summary', 'sourcesBorder', 'sources', 'sourcesTitle'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    },
    summary: {
      fontSize: 'larger',
      fontWeight: 800,
      maxWidth: '52rem',
      color: 'orange.500',
      bgLinear: 'to-tl',
      gradientFrom: 'red.500/40',
      gradientTo: 'red.700/60',
      border: 5,
      borderColor: 'red.600/80',
      borderStyle: 'solid',
      padding: '0.5rem',
      rounded: 'xl',
      paddingLeft: '20px',
      _hover: {
        borderColor: 'amber.400',
        borderStyle: 'solid',
        gradientFrom: 'red.500/50',
        gradientTo: 'red.700/70',
      },
    },
    sourcesBorder: {
      md: {
        display: 'flex',
        _before: {
          borderLeftWidth: 15,
          borderLeftColor: 'red.500/40',
          rounded: '6px',
          content: '""',
          marginRight: '10px',
        },
      },
    },
    sources: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    },
    sourcesTitle: {
      color: 'white',
      fontWeight: 800,
      fontSize: 'large',
    },
  },
});
