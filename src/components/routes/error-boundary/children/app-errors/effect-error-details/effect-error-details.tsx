import { FunctionComponent } from 'react';
import { Box, styled } from '@panda/jsx';
import { ErrorData } from 'effect-errors';

import { CodeFromEffectError } from '@components/design-system/code';
import { MotionContainer } from '@components/design-system/motion-container';

import { effectErrorDetailsStyles } from './effect-error-details.styles';
import { ErrorMessage } from './error-message';
import { ErrorSpansTree } from './error-spans-tree';

type EffectErrorDetailsProps = {
  number: number;
  error: ErrorData;
  hasSeveralErrors: boolean;
};

export const EffectErrorDetails: FunctionComponent<EffectErrorDetailsProps> = ({
  number,
  error,
  hasSeveralErrors,
}) => {
  const css = effectErrorDetailsStyles();

  return (
    <Box className={css.root}>
      <MotionContainer className={css.errorHeader}>
        <ErrorMessage
          number={number}
          error={error}
          hasSeveralErrors={hasSeveralErrors}
        />
        <ErrorSpansTree error={error} />
      </MotionContainer>
      <Box className={css.sourcesBorder}>
        <Box className={css.sources}>
          <span className={css.sourcesTitle}>Error related code</span>
          {error.sources?.map(({ runPath, source }) =>
            source ? (
              <CodeFromEffectError
                title={`.${/\/remix-effect-errors(\/src\/.*)/.exec(runPath)?.[1] ?? '?'}`}
                code={source}
              />
            ) : null,
          )}
        </Box>
      </Box>
    </Box>
  );
};
