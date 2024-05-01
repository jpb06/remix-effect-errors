import type { EffectError as EffectErrorType } from '../logic/is-effect-error.logic';

import { EffectError } from './EffectError';
import { NodeError } from './NodeError';

type AppErrorProps = {
  _tag: 'route' | 'error' | 'unknown' | 'effect';
  number: number;
  hasSeveralErrors: boolean;
  error: Error | EffectErrorType;
};

export const AppError = ({
  _tag,
  number,
  hasSeveralErrors,
  error,
}: AppErrorProps) => {
  if (_tag !== 'effect') {
    return (
      <NodeError
        number={number}
        hasSeveralErrors={hasSeveralErrors}
        error={error as Error}
      />
    );
  }

  return (
    <EffectError
      number={number}
      hasSeveralErrors={hasSeveralErrors}
      error={error as EffectErrorType}
    />
  );
};
