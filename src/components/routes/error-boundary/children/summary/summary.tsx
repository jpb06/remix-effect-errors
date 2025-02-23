import type { FunctionComponent } from 'react';

import TeenyiconsMoodFrownSolid from '~icons/teenyicons/mood-frown-solid';

import { Card } from '@components/design-system/card';
import { Title } from '@components/design-system/title';

import type { ErrorsDetails } from '../../hooks/use-error-details';
import { errorBoundarySummaryStyles } from './summary.styles';

type SummaryProps = Pick<ErrorsDetails, 'errors'>;

export const Summary: FunctionComponent<SummaryProps> = ({ errors }) => {
  const css = errorBoundarySummaryStyles();

  return (
    <Card>
      <Title size="2xl" className={css.root}>
        <div className={css.errors}>
          {errors.length} error{errors.length > 1 ? 's' : ''} occured
        </div>
        <TeenyiconsMoodFrownSolid className={css.icon} />
      </Title>
    </Card>
  );
};
