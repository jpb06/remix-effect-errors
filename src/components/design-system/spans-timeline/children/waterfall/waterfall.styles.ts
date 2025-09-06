import { sva } from '@panda/css';

export const spansTimelineWaterfallStyles = sva({
  slots: ['span'],
  base: {
    span: {
      border: 2,
      borderColor: 'amber.500/70',
      bgLinear: 'to-tr',
      gradientFrom: 'orange.600',
      gradientTo: 'amber.700',
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
