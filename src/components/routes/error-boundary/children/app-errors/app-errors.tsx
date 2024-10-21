import { Box } from '@panda/jsx';
import { match } from 'ts-pattern';

import type { ErrorsDetails } from '../../hooks/use-error-details';
import { appErrorStyles } from './app-error.styles';
import { EffectErrorDetails } from './effect-error-details/effect-error-details';
import { isEffectErrors } from './logic/is-effect-error.logic';
import { NodeErrorDetails } from './node-error-details';

type AppErrorsProps = Pick<ErrorsDetails, '_tag' | 'path' | 'errors'>;

export const AppErrors = (props: AppErrorsProps) => {
  const css = appErrorStyles();

  const hasSeveralErrors = props.errors.length > 1;

  return (
    <Box className={css.root}>
      {match(props)
        .when(isEffectErrors, ({ errors }) =>
          errors.map((error, index) => (
            <EffectErrorDetails
              // biome-ignore lint/suspicious/noArrayIndexKey: no id
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
              // biome-ignore lint/suspicious/noArrayIndexKey: no id
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
