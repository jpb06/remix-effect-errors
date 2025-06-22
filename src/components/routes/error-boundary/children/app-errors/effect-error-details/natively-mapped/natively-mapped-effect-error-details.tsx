import type { ErrorData } from 'effect-errors';
import type { FunctionComponent } from 'react';

import { MotionContainer } from '@components/design-system/motion-container';
import { SpansTimeline } from '@components/design-system/spans-timeline';
import { Box } from '@panda/jsx';

import {
  ErrorMessage,
  ErrorSpansTree,
  effectErrorDetailsStyles,
} from '../common-children';
import { NativelyMappedErrorSources } from './children/natively-mapped-error-sources';
import { UnmappedErrorLocations } from './children/unmapped-error-locations';

type NativelyMappedEffectErrorDetailsProps = {
  tag: 'effect-natively-mapped-errors' | 'effect-no-map-file';
  number: number;
  error: ErrorData;
  hasSeveralErrors: boolean;
};

export const NativelyMappedEffectErrorDetails: FunctionComponent<
  NativelyMappedEffectErrorDetailsProps
> = ({ tag, number, error, hasSeveralErrors }) => {
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
      <NativelyMappedErrorSources tag={tag} error={error} />
      <UnmappedErrorLocations tag={tag} error={error} />
    </Box>
  );
};
