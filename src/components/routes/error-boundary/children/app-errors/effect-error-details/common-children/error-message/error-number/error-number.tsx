import type { FunctionComponent } from 'react';

type ErrorNumberProps = {
  hasSeveralErrors: boolean;
  number: number;
};

export const ErrorNumber: FunctionComponent<ErrorNumberProps> = ({
  hasSeveralErrors,
  number,
}) => {
  if (!hasSeveralErrors) {
    return null;
  }

  return (
    <>
      <span>{`#${number}`}</span> •
    </>
  );
};
