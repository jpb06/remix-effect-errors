import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';

import type { PropsWithClassName } from '../../types/props-with-classname.type';
import { Card } from '../card/Card';
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
    className={`mockup-code mx-10 bg-gradient-to-tr from-slate-900 to-slate-800 text-white md:mx-0 md:w-[52rem] ${className}`}
  >
    {/* // <Card
  //   className={`mockup-code bg-gradient-to-tr from-slate-900 to-slate-800 ${className}`}
  // > */}
    {/* //-mt-[66px] ml-[57px] */}
    <div className="-mt-[34px] ml-[88px] font-medium text-slate-600">Code</div>
    {code.split('\n').map((line, index) => (
      <pre
        key={index}
        data-prefix={index + 1}
        //-ml-8 -mr-8
        className={`${errorIndexes?.includes(index + 1) ? 'bg-red-900' : undefined}`}
        dangerouslySetInnerHTML={{
          __html: hljs.highlightAuto(line, ['typescript']).value,
        }}
      ></pre>
    ))}
    {/* // </Card> */}
  </MotionContainer>
);
