import { sva } from '@panda/css';

export const errorSpansStyles = sva({
  slots: ['root', 'xIcon', 'spansList', 'spanRoot', 'spanDetails'],
  base: {
    root: {
      marginY: '15px',
      display: 'block',
      position: 'relative',
    },
    xIcon: {
      _before: {
        content: '"❌"',
        zIndex: 20,
        position: 'absolute',
        top: '-12px',
        left: '-3px',
        fontSize: 'xx-large',
      },
    },
    spansList: {
      marginLeft: '10px',
      paddingLeft: 0,
    },
    spanRoot: {
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
    spanDetails: {
      paddingLeft: '40px',
      color: 'slate.300',
      fontSize: 'small',
    },
  },
});
