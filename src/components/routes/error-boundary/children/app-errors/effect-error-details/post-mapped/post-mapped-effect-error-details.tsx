import type { FunctionComponent } from 'react';

import { CodeFromPostMappedEffectError } from '@components/design-system/code';
import { MotionContainer } from '@components/design-system/motion-container';
import { SpansTimeline } from '@components/design-system/spans-timeline';
import { Box } from '@panda/jsx';
import type { EffectErrorWithSources } from '@types';

import {
  ErrorMessage,
  ErrorSpansTree,
  effectErrorDetailsStyles,
} from '../common-children';

type PostMappedEffectErrorDetailsProps = {
  number: number;
  error: EffectErrorWithSources;
  hasSeveralErrors: boolean;
};

export const PostMappedEffectErrorDetails: FunctionComponent<
  PostMappedEffectErrorDetailsProps
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
          {error.sources.map((source, index) => (
            <CodeFromPostMappedEffectError
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
