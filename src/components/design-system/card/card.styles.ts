import { sva } from '@panda/css';

export const createStyles = sva({
  slots: ['container', 'body'],
  base: {
    container: {
      border: 2,
      borderColor: 'cyan.800',
      borderStyle: 'solid',
      wordBreak: 'break-word',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '2xl',
      overflow: 'clip',
      color: 'slate.200',
      bgGradient: 'to-tl',
      gradientFrom: 'indigo.950',
      gradientToPosition: '90%',
      gradientTo: 'cyan.950',
      shadow: 'xl',
      _focus: {
        outline: '2px solid transparent',
        outlineOffset: 0.5,
      },
      _hover: {
        borderColor: 'amber.500',
        gradientFrom: 'indigo.950/60',
        gradientToPosition: '90%',
        gradientTo: 'cyan.950',
      },
      md: {
        width: '52rem',
      },
    },
    body: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      padding: 8,
      gap: 2,
    },
  },
});
