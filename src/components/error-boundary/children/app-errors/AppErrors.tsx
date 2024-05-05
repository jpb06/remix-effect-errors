import { match } from 'ts-pattern';

import type { ErrorsDetails } from '../../hooks/useErrorDetails';
import type { EffectError } from '../../logic/is-effect-error.logic';

import { EffectErrorDetails } from './children/EffectErrorDetails';
import { NodeErrorDetails } from './children/NodeErrorDetails';

type AppErrorsProps = Pick<ErrorsDetails, '_tag' | 'path' | 'errors'>;

const isEffectErrors = (
  p: ErrorsDetails,
): p is { _tag: 'effect'; path: string; errors: EffectError[] } =>
  p._tag === 'effect';

export const AppErrors = (props: AppErrorsProps) => {
  const hasSeveralErrors = props.errors.length > 1;

  return match(props)
    .when(isEffectErrors, ({ errors }) =>
      errors.map((error, index) => (
        <EffectErrorDetails
          key={index}
          number={index + 1}
          hasSeveralErrors={hasSeveralErrors}
          error={error}
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
    );
};
