import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';

import type { PropsWithClassName } from '../../types/props-with-classname.type';
import { MotionContainer } from '../motion-container/MotionContainer';

type CodeProps = {
  code: string;
  errorIndexes: number[];
};

export const Code = ({
  className,
  code,
  errorIndexes,
}: PropsWithClassName<CodeProps>) => (
  <MotionContainer
    className={`mockup-code bg-gradient-to-tr from-slate-900 to-slate-800 ${className}`}
  >
    {code.split('\n').map((line, index) => (
      <pre
        key={index}
        data-prefix={index + 1}
        className={errorIndexes?.includes(index + 1) ? 'bg-red-900' : undefined}
        dangerouslySetInnerHTML={{
          __html: hljs.highlightAuto(line, ['typescript']).value,
        }}
      ></pre>
    ))}
  </MotionContainer>
);
