import { Card } from '../../../../card/Card';
import type { EffectError as EffectErrorType } from '../../../logic/is-effect-error.logic';

import { ErrorNumber } from './ErrorNumber';

type EffectErrorDetailsProps = {
  number: number;
  hasSeveralErrors: boolean;
  error: EffectErrorType;
};

export const EffectErrorDetails = ({
  hasSeveralErrors,
  number,
  error,
}: EffectErrorDetailsProps) => (
  <Card>
    <div className="text-lg">
      <ErrorNumber hasSeveralErrors={hasSeveralErrors} number={number} />{' '}
      <span className="font-bold text-red-500 underline">{error.type}</span> •{' '}
      {error.message}
    </div>
    <ul className="tree -ml-3">
      <li>
        <div>&nbsp;</div>
        <ul>
          {error.spans?.map(({ name, attributes, duration }, spanNumber) => (
            <li key={spanNumber}>
              <details open>
                <summary className="text-white underline">{name}</summary>
                <div>{duration !== undefined ? `~ ${duration} ms` : ''}</div>
                <div>
                  {Object.entries(attributes)
                    .filter(([, value]) => value !== null)
                    .map(([key, value], attributeNumber) => (
                      <div key={attributeNumber}>
                        <span className="text-sky-500">{key}</span>:{' '}
                        {JSON.stringify(value)}
                      </div>
                    ))}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </li>
    </ul>
    <div className="border-l-2 border-red-600 pl-2">{error.stack}</div>
  </Card>
);
