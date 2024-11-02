import { sva } from '@panda/css';

export const spansTimelineHoverStyles = sva({
  slots: ['root'],
  base: {
    root: {
      display: 'none',
      _groupHover: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        gap: 2.5,
        padding: '0.2rem',
        paddingTop: '2.3rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        fontSize: 'x-small',
        top: 0,
        left: 0,
        width: '100%',
      },
    },
  },
});
