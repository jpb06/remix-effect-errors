import type { ErrorSpan } from 'effect-errors';
import type { FunctionComponent } from 'react';

import { spansDetailsStyles } from './span-details.styles';

type SpanDetailsProps = ErrorSpan;

export const SpanDetails: FunctionComponent<SpanDetailsProps> = ({
  name,
  attributes,
  durationInMilliseconds,
}) => {
  const css = spansDetailsStyles();

  return (
    <div className={css.root}>
      <details open={true} className={css.details}>
        <summary className={css.summary}>{name}</summary>
        <div className={css.duration}>
          {durationInMilliseconds !== undefined
            ? `~ ${durationInMilliseconds} ms`
            : ''}
        </div>
        <div className={css.attributes}>
          {Object.entries(attributes)
            .filter(([, value]) => value !== null)
            .map(([key, value], attributeNumber) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: no id
              <div key={attributeNumber}>
                <span>{key}</span>: {JSON.stringify(value)}
              </div>
            ))}
        </div>
      </details>
    </div>
  );
};
