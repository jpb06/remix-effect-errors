import { AppErrors } from './children/app-errors/AppErrors';
import { Summary } from './children/Summary';
import { useErrorDetails } from './hooks/useErrorDetails';

export const ErrorBoundary = () => {
  const data = useErrorDetails();

  return (
    <div className="mb-2 flex flex-col gap-2">
      <Summary {...data} />
      <AppErrors {...data} />
    </div>
  );
};
