import { cx } from '@panda/css';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';
import { SourceCode } from 'effect-errors';
import { FunctionComponent } from 'react';
import { PropsWithClassName } from 'src/types/props-with-classname.type';
import { MotionContainer } from '../motion-container';
import { codeStyles } from './code.styles';
import { Header } from './header';

type CodeFromEffectErrorProps = PropsWithClassName<{
  title: string;
  code: SourceCode[];
}>;

export const CodeFromEffectError: FunctionComponent<
  CodeFromEffectErrorProps
> = ({ className, title, code }) => {
  const css = codeStyles({ type: 'error' });

  return (
    <MotionContainer className={cx(css.root, className)}>
      <Header title={title} />
      {code.map(({ code, line, column }, index) => (
        <pre
          key={index}
          data-prefix={line}
          className={column ? css.errorLine : undefined}
          dangerouslySetInnerHTML={{
            __html: hljs.highlightAuto(code, ['xml', 'typescript']).value,
          }}
        />
      ))}
    </MotionContainer>
  );
};
