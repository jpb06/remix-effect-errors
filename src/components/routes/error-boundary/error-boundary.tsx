import { AppErrors } from './children/app-errors';
import { NoSourcemapWarning } from './children/no-sourcemap-warning';
import { Summary } from './children/summary';
import { errorBoundaryStyles } from './error-boundary.styles';
import { useErrorDetails } from './hooks/use-error-details';

export const ErrorBoundary = () => {
  const css = errorBoundaryStyles();

  const data = useErrorDetails();

  return (
    <div className={css.root}>
      <Summary {...data} />
      <NoSourcemapWarning {...data} />
      <AppErrors {...data} />
    </div>
  );
};
