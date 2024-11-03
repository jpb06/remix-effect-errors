import { Box } from '@panda/jsx';
import type { ErrorSpan } from 'effect-errors';
import type { FunctionComponent } from 'react';

import { spansTimelineWaterfallStyles } from './waterfall.styles';

type SpansTimelineWaterfallProps = {
  spans: ErrorSpan[];
  start: bigint;
  max: number;
};

export const SpansTimelineWaterfall: FunctionComponent<
  SpansTimelineWaterfallProps
> = ({ spans, start, max }) => {
  const css = spansTimelineWaterfallStyles();

  return (
    <>
      {spans.map(({ startTime }, index) => {
        const startMs = BigInt(startTime - start) / BigInt(1000000);
        const startPercent = (Number(startMs) * 100) / max;

        return (
          <Box
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className={css.span}
            style={{
              marginLeft: `${startPercent > 96 ? '96' : startPercent}%`,
            }}
          />
        );
      })}
    </>
  );
};
