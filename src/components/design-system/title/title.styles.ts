import { RecipeVariantProps, sva } from '@panda/css';

export type TitleSize = NonNullable<
  RecipeVariantProps<typeof titleStyles>
>['size'];

export const titleStyles = sva({
  slots: ['root'],
  base: {
    root: {
      color: 'white',
      fontWeight: 700,
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        },
      },
      base: {
        root: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
        },
      },
      xl: {
        root: {
          fontSize: '1.25rem',
          lineHeight: '1.75rem',
        },
      },
      '2xl': {
        root: {
          fontSize: '1.5rem',
          lineHeight: '2rem',
        },
      },
      '3xl': {
        root: {
          fontSize: '1.875rem',
          lineHeight: '2.25rem',
        },
      },
    },
  },
});
