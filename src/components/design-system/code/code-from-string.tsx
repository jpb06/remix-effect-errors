import { cx } from '@panda/css';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';
import { FunctionComponent } from 'react';
import { PropsWithClassName } from 'src/types/props-with-classname.type';
import { MotionContainer } from '../motion-container';
import { CodeType, codeStyles } from './code.styles';
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
          key={index}
          data-prefix={index + 1}
          className={`${errorIndexes?.includes(index + 1) ? css.errorLine : undefined}`}
          dangerouslySetInnerHTML={{
            __html: hljs.highlightAuto(line, ['xml', 'typescript']).value,
          }}
        />
      ))}
    </MotionContainer>
  );
};
