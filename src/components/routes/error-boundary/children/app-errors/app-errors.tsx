import { match } from 'ts-pattern';

import type { ErrorsDetails } from '../../hooks/useErrorDetails';

import { Box } from '@panda/jsx';
import { ErrorData } from 'effect-errors';
import { EffectErrorDetails } from './effect-error-details/effect-error-details';
import { NodeErrorDetails } from './node-error-details';
import { appErrorStyles } from './app-error.styles';

type AppErrorsProps = Pick<ErrorsDetails, '_tag' | 'path' | 'errors'>;

const isEffectErrors = (
  arg: AppErrorsProps,
): arg is { _tag: 'effect'; path: string; errors: ErrorData[] } =>
  arg._tag === 'effect';

export const AppErrors = (props: AppErrorsProps) => {
  const css = appErrorStyles();

  const hasSeveralErrors = props.errors.length > 1;

  return (
    <Box className={css.root}>
      {match(props)
        .when(isEffectErrors, ({ errors }) =>
          errors.map((error, index) => (
            <EffectErrorDetails
              key={index}
              number={index + 1}
              error={error}
              hasSeveralErrors={hasSeveralErrors}
            />
          )),
        )
        .otherwise(({ errors }) =>
          errors.map((error, index) => (
            <NodeErrorDetails
              key={index}
              number={index + 1}
              hasSeveralErrors={hasSeveralErrors}
              error={error as Error}
            />
          )),
        )}
    </Box>
  );
};
