import { Card } from '../../card/Card';

import { ErrorNumber } from './ErrorNumber';

type NodeErrorProps = {
  number: number;
  hasSeveralErrors: boolean;
  error: Error;
};

export const NodeError = ({
  number,
  hasSeveralErrors,
  error,
}: NodeErrorProps) => (
  <Card>
    <ErrorNumber hasSeveralErrors={hasSeveralErrors} number={number} />{' '}
    {error.message}
    <div className="border-l-2 border-red-600 pl-2">{error.stack}</div>
  </Card>
);
