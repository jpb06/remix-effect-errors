import { Icon } from '@iconify/react/dist/iconify.js';

import { Card } from '../card/Card';
import { Title } from '../title/Title';

import { AppError } from './children/AppError';
import { SourceCode } from './children/SourceCode';
import { useErrorDetails } from './hooks/useErrorDetails';

export const ErrorBoundary = () => {
  const { _tag, errors, ...rest } = useErrorDetails();

  const maybeWithCode = rest as {
    path: string;
    sourceCode?: string | undefined;
    errorLines?: number[] | undefined;
  };

  return (
    <div className="mb-3 flex flex-col gap-3">
      <Card>
        <Title size="2xl" className="flex justify-between">
          <div className="content-center">
            {errors.length} error{errors.length > 1 ? 's' : ''} occured
          </div>
          <Icon icon="fa-solid:sad-tear" className="h-10 w-10" />
        </Title>
      </Card>
      {errors.map((error, index) => (
        <AppError
          key={index}
          _tag={_tag}
          number={index + 1}
          hasSeveralErrors={errors.length > 1}
          error={error}
        />
      ))}
      <SourceCode
        sourceCode={maybeWithCode.sourceCode}
        errorLines={maybeWithCode.errorLines}
      />
    </div>
  );
};
