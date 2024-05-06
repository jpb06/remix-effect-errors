import { Icon } from '@iconify/react/dist/iconify.js';

import { Card } from '../../card/Card';
import { Title } from '../../title/Title';
import type { ErrorsDetails } from '../hooks/useErrorDetails';

type SummaryProps = Pick<ErrorsDetails, 'errors'>;

export const Summary = ({ errors }: SummaryProps) => (
  <Card>
    <Title size="2xl" className="flex justify-between">
      <div className="content-center">
        {errors.length} error{errors.length > 1 ? 's' : ''} occured
      </div>
      <Icon icon="fa-solid:sad-tear" className="h-10 w-10" />
    </Title>
  </Card>
);
