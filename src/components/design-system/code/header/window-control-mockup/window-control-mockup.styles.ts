import { sva } from '@panda/css';
import type { RecipeVariantProps } from '@panda/css';

export type WindowControlMockupColor = NonNullable<
  RecipeVariantProps<typeof windowControlMockupStyles>
>['color'];

export const windowControlMockupStyles = sva({
  slots: ['root'],
  base: {
    root: {
      width: '1.5rem',
      height: '1.5rem',
      clipPath: 'circle(0.5rem)',
      backgroundColor: 'white',
    },
  },
  variants: {
    color: {
      red: {
        root: {
          bgColor: 'red.500',
        },
      },
      green: {
        root: {
          bgColor: 'green.500',
        },
      },
      yellow: {
        root: {
          bgColor: 'yellow.500',
        },
      },
    },
  },
});
