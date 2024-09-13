import { AppErrors } from './children/app-errors';
import { Summary } from './children/summary';
import { errorBoundaryStyles } from './error-boundary.styles';
import { useErrorDetails } from './hooks/useErrorDetails';

export const ErrorBoundary = () => {
  const css = errorBoundaryStyles();
  const data = useErrorDetails();

  return (
    <div className={css.root}>
      <Summary {...data} />
      <AppErrors {...data} />
    </div>
  );
};
