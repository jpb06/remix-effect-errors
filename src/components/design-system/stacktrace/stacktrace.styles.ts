import { sva } from '@panda/css';

export const stacktraceStyles = sva({
  slots: ['root', 'line'],
  base: {
    root: {
      borderColor: 'red.400',
      border: 2,
      borderStyle: 'solid',
      padding: 2,
      borderRadius: 'xl',
      bgLinear: 'to-tl',
      gradientFrom: 'violet.950',
      gradientTo: 'teal.950',
      color: 'emerald.100',
      overflow: 'hidden',
      overflowX: 'auto',
      '& pre:before': {
        content: '',
        marginRight: '1ch',
      },
      '& pre[data-prefix]:before': {
        content: 'attr(data-prefix)',
        display: 'inline-block',
        textAlign: 'right',
        width: '1rem',
        opacity: 0.5,
        color: 'slate.400',
      },
      md: {
        width: '50.5rem',
        _scrollbar: {
          borderRadius: '0.6rem',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height: '0.6rem',
        },
        _scrollbarThumb: {
          borderRadius: '0.6rem',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: 'amber.700/20',
        },
        _scrollbarTrack: {
          borderRadius: '0.6rem',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: 'slate.500/20',
        },
      },
      _hover: {
        bgLinear: 'to-tl',
        gradientFrom: 'purple.900/70',
        gradientFromPosition: '-50%',
        gradientTo: 'amber.950/70',
        borderColor: 'amber.500',
        _scrollbar: {
          borderRadius: '0.6rem',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height: '0.6rem',
        },
        _scrollbarThumb: {
          borderRadius: '0.6rem',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: 'amber.500/60',
        },
        _scrollbarTrack: {
          borderRadius: '0.6rem',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: 'fuschia.300',
        },
      },
    },
    line: {
      color: 'gray.300',
      fontSize: 'sm',
      _before: {
        content: '"⭕"',
        marginRight: '6px',
      },
    },
  },
});
