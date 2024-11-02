import { sva } from '@panda/css';

export const spansTimelineTitleStyles = sva({
  slots: ['root'],
  base: {
    root: {
      fontSize: 'xl',
      color: 'amber.400',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
});
