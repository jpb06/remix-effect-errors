import type { FunctionComponent } from 'react';

import type { EffectErrorWithSources } from '@types';

import { errorSpansStyles } from './error-spans.styles';
import { SpanDetails } from './span-details';

type ErrorSpansTreeProps = {
  error: EffectErrorWithSources;
};

export const ErrorSpansTree: FunctionComponent<ErrorSpansTreeProps> = ({
  error,
}) => {
  const css = errorSpansStyles();

  return (
    <ul className={css.root}>
      <div className={css.xIcon}>&nbsp;</div>
      <ul className={css.spansList}>
        {error.spans?.map((span, spanNumber) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: no id
          <SpanDetails key={spanNumber} {...span} />
        ))}
      </ul>
    </ul>
  );
};
