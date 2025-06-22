import 'highlight.js/styles/github-dark.css';

import hljs from 'highlight.js/lib/common';
import type { FunctionComponent } from 'react';

import { cx } from '@panda/css';
import type { PropsWithClassName } from '@types';

import { MotionContainer } from '../motion-container';
import { type CodeType, codeStyles } from './code.styles';
import { Header } from './header';

type CodeProps = PropsWithClassName<{
  title: string;
  code: string;
  errorIndexes?: number[];
  type?: CodeType;
}>;

export const CodeFromString: FunctionComponent<CodeProps> = ({
  className,
  title,
  code,
  errorIndexes,
  type = 'sample',
}) => {
  const css = codeStyles({ type });

  return (
    <MotionContainer className={cx(css.root, className)}>
      <Header title={title} />
      {code.split('\n').map((line, index) => (
        <pre
          // biome-ignore lint/suspicious/noArrayIndexKey: no id
          key={index}
          data-prefix={index + 1}
          className={`${errorIndexes?.includes(index + 1) ? css.errorLine : undefined}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: error code
          dangerouslySetInnerHTML={{
            __html: hljs.highlightAuto(line, ['xml', 'typescript']).value,
          }}
        />
      ))}
    </MotionContainer>
  );
};
