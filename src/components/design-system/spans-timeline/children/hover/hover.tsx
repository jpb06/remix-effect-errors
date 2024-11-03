import { Box } from '@panda/jsx';
import type { ErrorSpan } from 'effect-errors';
import type { FunctionComponent } from 'react';

import { spansTimelineHoverStyles } from './hover.styles';

type SpansTimelineHoverProps = {
  spans: ErrorSpan[];
};

export const SpanTimelineHover: FunctionComponent<SpansTimelineHoverProps> = ({
  spans,
}) => {
  const css = spansTimelineHoverStyles();

  return (
    <Box className={css.root}>
      {spans.map(({ name, durationInMilliseconds }, index) => (
        <Box
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          className={css.span}
        >
          <span>{name}</span>
          <span>{durationInMilliseconds} ms</span>
        </Box>
      ))}
    </Box>
  );
};
