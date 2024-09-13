import { sva } from '@panda/css';

export const appBarStyles = sva({
  slots: [
    'container',
    'navbarStart',
    'navbarEnd',
    'desktopMenuItems',
    'mobileMenu',
    'mobileMenuInput',
    'mobileMenuIcon',
    'mobileMenuItems',
    'icon',
  ],
  base: {
    container: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
      minHeight: '4rem',
      zIndex: 50,
      paddingX: 2,
      borderRadius: 'xl',
      bgGradient: 'to-tr',
      gradientFrom: 'cyan.900',
      gradientTo: 'blue.800',
      width: '300px',
      marginX: 2,
      marginBottom: '2.5rem',
      md: {
        width: '100%',
        maxWidth: '52rem',
      },
    },
    navbarStart: {
      justifyContent: 'flex-start',
    },
    navbarEnd: {
      justifyContent: 'flex-end',
      display: 'flex',
      textAlign: 'right',
    },
    desktopMenuItems: {
      display: 'none',
      md: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        paddingY: '10px',
      },
    },
    mobileMenu: {
      display: 'flex',
      alignItems: 'center',
      width: 'inherit',
      md: {
        width: 'auto',
      },
    },
    mobileMenuInput: {
      display: 'none',
    },
    mobileMenuIcon: {
      display: 'flex',
      md: {
        display: 'none',
      },
    },
    mobileMenuItems: {
      display: 'none',
      _peerChecked: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: 'inherit',
        top: '95px',
        borderRadius: 'xl',
        bgGradient: 'to-tr',
        gradientFrom: 'cyan.900',
        gradientTo: 'blue.800',
        padding: '10px',
        marginLeft: '-10px',
        transition: '1s',
      },
    },
    icon: {
      color: 'white',
      width: '3rem',
      height: '3rem',
      md: {
        width: '4rem',
        height: '4rem',
      },
    },
  },
});
