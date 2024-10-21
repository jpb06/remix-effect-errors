import { sva } from '@panda/css';

export const errorMessageStyles = sva({
  slots: ['type', 'message'],
  base: {
    type: {
      textDecoration: 'underline',
      color: 'amber.400',
    },
    message: {
      color: 'red.300',
    },
  },
});
