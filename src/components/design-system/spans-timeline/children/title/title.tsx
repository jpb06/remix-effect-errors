import type { FunctionComponent } from 'react';

import { Box } from '@panda/jsx';

import { spansTimelineTitleStyles } from './title.styles';

export const SpansTimelineTitle: FunctionComponent = () => {
  const css = spansTimelineTitleStyles();

  return <Box className={css.root}>Timeline</Box>;
};
