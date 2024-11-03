import { Box } from '@panda/jsx';
import type { ErrorData } from 'effect-errors';
import type { FunctionComponent } from 'react';

import { CodeFromNativelyMappedEffectError } from '@components/design-system/code';
import { MotionContainer } from '@components/design-system/motion-container';
import { SpansTimeline } from '@components/design-system/spans-timeline';

import {
  ErrorMessage,
  ErrorSpansTree,
  effectErrorDetailsStyles,
} from '../common-children';

type NativelyMappedEffectErrorDetailsProps = {
  number: number;
  error: ErrorData;
  hasSeveralErrors: boolean;
};

export const NativelyMappedEffectErrorDetails: FunctionComponent<
  NativelyMappedEffectErrorDetailsProps
> = ({ number, error, hasSeveralErrors }) => {
  const css = effectErrorDetailsStyles();

  return (
    <Box className={css.root}>
      <MotionContainer className={css.summary}>
        <ErrorMessage
          number={number}
          error={error}
          hasSeveralErrors={hasSeveralErrors}
        />
        <ErrorSpansTree error={error} />
      </MotionContainer>
      <SpansTimeline spans={error.spans} />
      <Box className={css.sourcesBorder}>
        <Box className={css.sources}>
          <span className={css.sourcesTitle}>Error related code</span>
          {error.sources?.map((source, index) => (
            <CodeFromNativelyMappedEffectError
              // biome-ignore lint/suspicious/noArrayIndexKey: no id
              key={index}
              {...source}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
