import { sva } from '@panda/css';

export const linkStyles = sva({
  slots: ['root'],
  base: {
    root: {
      color: 'yellow.500',
      textDecorationLine: 'underline',
      fontWeight: 600,
      _hover: {
        color: 'yellow.300',
        cursor: 'pointer',
      },
    },
  },
});
