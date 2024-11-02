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
          css={{
            display: 'flex',
            color: 'amber.100',
            justifyContent: 'space-between',
            height: '1rem',
            lineHeight: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          <span>{name}</span>
          <span>{durationInMilliseconds} ms</span>
        </Box>
      ))}
    </Box>
  );
};
