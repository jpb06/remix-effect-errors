import type { FunctionComponent } from 'react';

import { Card } from '@components/design-system/card';

import { ErrorNumber } from '../effect-error-details/common-children/error-message/error-number';
import { nodeErrorDetailsStyles } from './node-error-details.styles';

type NodeErrorDetailsProps = {
  number: number;
  hasSeveralErrors: boolean;
  error: Error;
};

export const NodeErrorDetails: FunctionComponent<NodeErrorDetailsProps> = ({
  number,
  hasSeveralErrors,
  error,
}) => {
  const css = nodeErrorDetailsStyles();

  return (
    <Card>
      <ErrorNumber hasSeveralErrors={hasSeveralErrors} number={number} />{' '}
      {error.message}
      <div className={css.stack}>{error.stack}</div>
    </Card>
  );
};
