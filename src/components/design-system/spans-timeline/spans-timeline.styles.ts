import { sva } from '@panda/css';

export const spanTimelineStyles = sva({
  slots: ['root', 'linesContainer', 'bar'],
  base: {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      maxWidth: '52rem',
      bgGradient: 'to-tl',
      gradientFrom: 'red.500/40',
      gradientTo: 'red.700/60',
      border: 5,
      borderColor: 'red.600/80',
      borderStyle: 'solid',
      rounded: 'xl',
      _hover: {
        borderColor: 'amber.400',
        borderStyle: 'solid',
        gradientFrom: 'red.500/50',
        gradientTo: 'red.700/70',
      },
    },
    linesContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: 0.5,
      padding: '0.2rem',
      paddingRight: '0.2rem',
    },
    bar: {
      border: 2,
      borderColor: 'amber.500/70',
      bgGradient: 'to-tr',
      gradientFrom: 'orange.600/70',
      gradientTo: 'amber.700/70',
      borderStyle: 'solid',
      padding: '0.2rem',
      rounded: 'md',
      fontSize: 'x-small',
      height: '1.5rem',
      _hover: {
        borderColor: 'amber.500',
        borderStyle: 'solid',
        gradientFrom: 'orange.600',
        gradientTo: 'amber.700',
      },
    },
  },
});
