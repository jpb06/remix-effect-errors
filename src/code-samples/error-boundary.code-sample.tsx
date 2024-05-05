import { match } from 'ts-pattern';

import type { EffectError } from './useErrorDetails.code-sample';
import { useErrorDetails } from './useErrorDetails.code-sample';

type EffectErrorDetailsProps = Pick<EffectError, 'type' | 'message' | 'spans'>;

const EffectErrorDetails = ({
  type,
  message,
  spans,
}: EffectErrorDetailsProps) => (
  <li>
    {type} {message}{' '}
    {spans?.map(({ name, duration, attributes }, spanIndex) => (
      <div key={spanIndex}>
        <div>{name}</div>
        <div>{duration !== undefined ? `~ ${duration} ms` : ''}</div>
        <div>
          {Object.entries(attributes)
            .filter(([, value]) => value !== null)
            .map(([key, value], attributeNumber) => (
              <div key={attributeNumber}>
                <span>{key}</span>: {JSON.stringify(value)}
              </div>
            ))}
        </div>
      </div>
    ))}
  </li>
);

const isEffectErrors = (
  p: ReturnType<typeof useErrorDetails>,
): p is { _tag: 'effect'; path: string; errors: EffectError[] } =>
  p._tag === 'effect';

export const ErrorBoundary = () => {
  const errors = useErrorDetails();

  return match(errors)
    .when(isEffectErrors, ({ errors }) => (
      <ul>
        {errors.map((e, errorIndex) => (
          <EffectErrorDetails key={errorIndex} {...e} />
        ))}
      </ul>
    ))
    .otherwise(({ errors }) => (
      <ul>
        {errors.map(({ message }, errorIndex) => (
          <li key={errorIndex}>{message}</li>
        ))}
      </ul>
    ));
};
