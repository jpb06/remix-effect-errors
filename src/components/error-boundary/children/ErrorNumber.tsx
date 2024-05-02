type ErrorNumberProps = {
  hasSeveralErrors: boolean;
  number: number;
};

export const ErrorNumber = ({ hasSeveralErrors, number }: ErrorNumberProps) => {
  if (hasSeveralErrors) {
    return (
      <>
        <span className="text-white">{`#${number}`}</span> •
      </>
    );
  }

  return null;
};
