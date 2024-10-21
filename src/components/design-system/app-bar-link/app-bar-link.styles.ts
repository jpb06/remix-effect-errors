import type { RecipeVariantProps } from '@panda/css';
import { sva } from '@panda/css';

export type AppBarLinkSize = NonNullable<
  RecipeVariantProps<typeof appBarLinkStyles>
>['size'];
export type AppBarLinkState = NonNullable<
  RecipeVariantProps<typeof appBarLinkStyles>
>['state'];

export const appBarLinkStyles = sva({
  slots: ['root'],
  base: {
    root: {
      fontWeight: 'bold',
      paddingX: 2,
      rounded: 'xl',
      _hover: {
        bgColor: 'sky.600/20',
      },
    },
  },
  variants: {
    state: {
      default: {
        root: {
          color: 'zinc.100',
        },
      },
      selected: {
        root: {
          bgColor: 'sky.600/40',
          color: 'yellow.400',
        },
      },
    },
    size: {
      narrow: {
        root: {
          paddingY: 1,
        },
      },
      wide: {
        root: {
          paddingY: 4,
        },
      },
    },
  },
});
