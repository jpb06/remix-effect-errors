import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';

import type { PropsWithClassName } from '../../types/props-with-classname.type';
import { MotionContainer } from '../motion-container/MotionContainer';

type CodeProps = {
  code: string;
  errorIndexes?: number[];
  title: string;
};

export const Code = ({
  title,
  className,
  code,
  errorIndexes,
}: PropsWithClassName<CodeProps>) => (
  <MotionContainer
    className={`mockup-code w-[calc(100vw-10px)] bg-gradient-to-tr from-slate-900 to-slate-800 text-white before:text-white before:opacity-80 md:w-[52rem] ${className}`}
  >
    <div className="-mt-[34px] mb-2 ml-[88px] font-medium text-white opacity-80">
      {title}
    </div>
    {code.split('\n').map((line, index) => (
      <pre
        key={index}
        data-prefix={index + 1}
        className={`${errorIndexes?.includes(index + 1) ? 'bg-red-900' : undefined}`}
        dangerouslySetInnerHTML={{
          __html: hljs.highlightAuto(line, ['typescript']).value,
        }}
      />
    ))}
  </MotionContainer>
);
