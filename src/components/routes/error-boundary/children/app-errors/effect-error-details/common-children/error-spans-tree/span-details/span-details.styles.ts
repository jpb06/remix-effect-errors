import { sva } from '@panda/css';

export const spansDetailsStyles = sva({
  slots: ['root', 'details', 'summary', 'duration', 'attributes'],
  base: {
    root: {
      borderLeft: '5px solid red',
      paddingTop: '15px',
      paddingLeft: '15px',
      _before: {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '20px',
        height: '35px',
        marginTop: '-15px',
        marginLeft: '-20px',
        border: 'solid red',
        borderWidth: '0 0 5px 5px',
        borderBottomLeftRadius: '10px',
      },
      _last: {
        borderColor: 'transparent',
      },
    },
    details: {
      paddingLeft: '40px',
      color: 'slate.300',
      fontSize: 'small',
    },
    summary: {
      display: 'block',
      cursor: 'pointer',
      color: 'red.500',
      fontSize: 'x-large',
      _before: {
        fontSize: 'xx-large',
        zIndex: 1,
        content: '"⭕"',
        display: 'block',
        position: 'absolute',
        marginTop: '-6px',
        marginLeft: '-38px',
      },
      _marker: {
        display: 'none',
      },
    },
    duration: {
      marginLeft: '-20px',
      color: 'yellow.400',
    },
    attributes: {
      marginLeft: '-20px',
      color: 'slate.100',
    },
  },
});
