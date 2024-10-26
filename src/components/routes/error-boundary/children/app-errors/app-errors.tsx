import { Box } from '@panda/jsx';
import type { EffectErrorWithSources } from '@types';
import { Match } from 'effect';
import type { ErrorData } from 'effect-errors';
import type { ErrorsDetails } from '../../hooks/use-error-details';
import { appErrorStyles } from './app-error.styles';
import {
  NativelyMappedEffectErrorDetails,
  PostMappedEffectErrorDetails,
} from './effect-error-details';
import { isEffectError } from './logic/is-effect-error.logic';
import { NodeErrorDetails } from './node-error-details';

export const AppErrors = (props: ErrorsDetails) => {
  const css = appErrorStyles();

  const hasSeveralErrors = props.errors.length > 1;

  return (
    <Box className={css.root}>
      {Match.value(props).pipe(
        Match.when(isEffectError, ({ _tag, errors }) =>
          errors.map((error, index) =>
            Match.value(_tag).pipe(
              Match.when('effect-natively-mapped-errors', () => (
                <NativelyMappedEffectErrorDetails
                  // biome-ignore lint/suspicious/noArrayIndexKey: no id
                  key={index}
                  number={index + 1}
                  error={error as ErrorData}
                  hasSeveralErrors={hasSeveralErrors}
                />
              )),
              Match.when('effect-post-mapped-errors', () => (
                <PostMappedEffectErrorDetails
                  // biome-ignore lint/suspicious/noArrayIndexKey: no id
                  key={index}
                  number={index + 1}
                  error={error as EffectErrorWithSources}
                  hasSeveralErrors={hasSeveralErrors}
                />
              )),
              Match.orElseAbsurd,
            ),
          ),
        ),
        Match.orElse(({ errors }) =>
          errors.map((error, index) => (
            <NodeErrorDetails
              // biome-ignore lint/suspicious/noArrayIndexKey: no id
              key={index}
              number={index + 1}
              hasSeveralErrors={hasSeveralErrors}
              error={error as Error}
            />
          )),
        ),
      )}
    </Box>
  );
};
