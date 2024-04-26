import { Card } from '../card/Card';
import { Title } from '../title/Title';

import { useErrorDetails } from './hooks/useErrorDetails';

export const ErrorBoundary = () => {
  const { path, errors } = useErrorDetails();

  return (
    <div className="flex flex-col">
      <Card title="Error">Cool</Card>
      <Title>{path}</Title>
      <Title>
        {errors.length} error{errors.length > 1 ? 's' : ''} occured
      </Title>
    </div>
  );
};
