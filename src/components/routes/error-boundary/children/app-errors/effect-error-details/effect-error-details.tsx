import { Box } from '@panda/jsx';
import type { FunctionComponent } from 'react';

import { CodeFromEffectError } from '@components/design-system/code';
import { MotionContainer } from '@components/design-system/motion-container';
import type { EffectErrorWithSources } from '@types';

import { effectErrorDetailsStyles } from './effect-error-details.styles';
import { ErrorMessage } from './error-message';
import { ErrorSpansTree } from './error-spans-tree';

type EffectErrorDetailsProps = {
  number: number;
  error: EffectErrorWithSources;
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
          {error.sources.map((source, index) => (
            <CodeFromEffectError
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              {...source}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
