import { cx } from '@panda/css';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';
import type { FunctionComponent } from 'react';

import type { EffectSource, PropsWithClassName } from '@types';

import { MotionContainer } from '../motion-container';
import { codeStyles } from './code.styles';
import { Header } from './header';

type CodeFromPostMappedEffectErrorProps = PropsWithClassName<EffectSource>;

export const CodeFromPostMappedEffectError: FunctionComponent<
  CodeFromPostMappedEffectErrorProps
> = ({ className, name, filePath, fileSources, line }) => {
  const css = codeStyles({ type: 'error' });

  const start = line >= 4 ? line - 4 : 0;
  const excerpt = fileSources.split('\n').splice(start, 7);

  return (
    <MotionContainer className={cx(css.root, className)}>
      <Header title={`./${filePath} ${name !== null ? `(${name})` : ''}`} />
      {excerpt.map((code, index) => {
        const lineNumber = start + index + 1;
        return (
          <pre
            // biome-ignore lint/suspicious/noArrayIndexKey: no id
            key={index}
            data-prefix={lineNumber}
            className={lineNumber === line ? css.errorLine : undefined}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: error code
            dangerouslySetInnerHTML={{
              __html: hljs.highlightAuto(code, ['xml', 'typescript']).value,
            }}
          />
        );
      })}
    </MotionContainer>
  );
};
