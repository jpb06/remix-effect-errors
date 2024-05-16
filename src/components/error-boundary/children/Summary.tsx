import { Card } from '../../card/Card';
import { Title } from '../../title/Title';
import type { ErrorsDetails } from '../hooks/useErrorDetails';

import TeenyiconsMoodFrownSolid from '~icons/teenyicons/mood-frown-solid';

type SummaryProps = Pick<ErrorsDetails, 'errors'>;

export const Summary = ({ errors }: SummaryProps) => (
  <Card>
    <Title size="2xl" className="flex justify-between">
      <div className="content-center">
        {errors.length} error{errors.length > 1 ? 's' : ''} occured
      </div>
      <TeenyiconsMoodFrownSolid className="h-10 w-10" />
    </Title>
  </Card>
);
