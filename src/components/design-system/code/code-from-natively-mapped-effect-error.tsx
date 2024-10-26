import { cx } from '@panda/css';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';
import type { ErrorData } from 'effect-errors';
import type { FunctionComponent } from 'react';

import type { PropsWithClassName } from '@types';

import { MotionContainer } from '../motion-container';
import { codeStyles } from './code.styles';
import { Header } from './header';

type SourcesData = NonNullable<ErrorData['sources']>[number];

type CodeFromNativelyMappedEffectErrorProps = PropsWithClassName<SourcesData>;

export const CodeFromNativelyMappedEffectError: FunctionComponent<
  CodeFromNativelyMappedEffectErrorProps
> = ({ className, source, sourcesPath, runPath }) => {
  const css = codeStyles({ type: 'error' });

  return (
    <MotionContainer className={cx(css.root, className)}>
      <Header title={runPath ?? sourcesPath ?? ''} />
      {source.map(({ code, column, line }, index) => {
        return (
          <pre
            // biome-ignore lint/suspicious/noArrayIndexKey: no id
            key={index}
            data-prefix={line}
            className={column ? css.errorLine : undefined}
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
