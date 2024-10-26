import { sva } from '@panda/css';

export const indexPageStyles = sva({
  slots: ['root', 'aside', 'technoList', 'codeSamples', 'list', 'listItem'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      paddingTop: '1rem',
      paddingBottom: '2rem',
      md: {
        marginLeft: 0,
        marginRight: 0,
        width: '52rem',
      },
      color: 'cyan.200',
      fontSize: '1rem',
    },
    technoList: {
      marginLeft: '1rem',
      marginBottom: '1rem',
      listStyleType: 'disc',
    },
    codeSamples: {
      marginY: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
    list: {
      listStyle: 'inside',
      listStylePosition: 'inside',
      listStyleType: '"🔹"',
    },
    listItem: {
      paddingLeft: '5px',
    },
  },
});
