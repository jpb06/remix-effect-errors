import { cx } from '@panda/css';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';
import type { FunctionComponent } from 'react';

import type { EffectSource, PropsWithClassName } from '@types';

import { MotionContainer } from '../motion-container';
import { codeStyles } from './code.styles';
import { Header } from './header';

type CodeFromEffectErrorProps = PropsWithClassName<EffectSource>;

export const CodeFromEffectError: FunctionComponent<
  CodeFromEffectErrorProps
> = ({ className, name, filePath, fileSources, line }) => {
  const css = codeStyles({ type: 'error' });

  const start = line >= 4 ? line - 4 : 0;
  const excerpt = fileSources.split('\n').splice(start, 7);

  return (
    <MotionContainer className={cx(css.root, className)}>
      <Header title={`./${filePath} ${name !== null ? `(${name})` : ''}`} />
      {excerpt.map((code, index) => (
        <pre
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          data-prefix={start + index + 1}
          className={start + index + 1 === line ? css.errorLine : undefined}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: hljs.highlightAuto(code, ['xml', 'typescript']).value,
          }}
        />
      ))}
    </MotionContainer>
  );
};
