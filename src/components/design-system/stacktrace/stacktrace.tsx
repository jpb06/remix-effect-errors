import { cx } from '@panda/css';
import 'highlight.js/styles/github-dark.css';
import type { FunctionComponent } from 'react';

import type { PropsWithClassName } from '@types';

import { MotionContainer } from '../motion-container';
import { stacktraceStyles } from './stacktrace.styles';

type StacktraceProps = PropsWithClassName<{
  stack: string[] | undefined;
}>;

export const Stacktrace: FunctionComponent<StacktraceProps> = ({
  className,
  stack,
}) => {
  const css = stacktraceStyles();

  return (
    <MotionContainer className={cx(css.root, className)}>
      {stack?.map((line, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: no id
        <div className={css.line} key={index}>
          {line}
        </div>
      ))}
    </MotionContainer>
  );
};
