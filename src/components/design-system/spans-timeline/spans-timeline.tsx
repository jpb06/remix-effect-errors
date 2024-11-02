import { cx } from '@panda/css';
import { Box } from '@panda/jsx';
import type { ErrorSpan } from 'effect-errors';
import type { FunctionComponent } from 'react';

import { MotionContainer } from '@components/design-system/motion-container';

import {
  SpanTimelineHover,
  SpansTimelineTitle,
  SpansTimelineWaterfall,
} from './children';
import { useErrorData } from './hooks/use-error-data';
import { spanTimelineStyles } from './spans-timeline.styles';

type TimelineProps = {
  spans: ErrorSpan[] | undefined;
};

export const SpansTimeline: FunctionComponent<TimelineProps> = ({ spans }) => {
  const css = spanTimelineStyles();

  const { hasInvalidTimeline, reversedSpans, start, max } = useErrorData(spans);
  if (hasInvalidTimeline) {
    return null;
  }

  return (
    <MotionContainer className={css.root}>
      <SpansTimelineTitle />
      <Box className={cx('group', css.linesContainer)}>
        <SpanTimelineHover spans={reversedSpans} />
        <SpansTimelineWaterfall spans={reversedSpans} start={start} max={max} />
      </Box>
    </MotionContainer>
  );
};
