import { ErrorData } from 'effect-errors';
import { FunctionComponent } from 'react';

import { errorSpansStyles } from './error-spans.styles';
import { SpanDetails } from './span-details';

type ErrorSpansTreeProps = {
  error: ErrorData;
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
          <SpanDetails key={spanNumber} {...span} />
        ))}
      </ul>
    </ul>
  );
};
