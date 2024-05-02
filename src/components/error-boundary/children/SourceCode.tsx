import { Code } from '../../code/Code';

type SourceCodeProps = {
  sourceCode?: string;
  errorLines?: number[];
};

export const SourceCode = ({ sourceCode, errorLines }: SourceCodeProps) => {
  const hasSourceCode = sourceCode !== undefined && errorLines !== undefined;

  return (
    <>
      {hasSourceCode ? (
        <Code
          className="mx-10 w-auto md:mx-0 md:w-[52rem]"
          code={sourceCode}
          errorIndexes={errorLines}
        />
      ) : null}
    </>
  );
};
