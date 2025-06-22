import type { FunctionComponent } from 'react';

import { CodeFromString } from '@components/design-system/code';
import { Link } from '@components/design-system/link';
import { Title } from '@components/design-system/title';
import { Box } from '@panda/jsx';

import { indexPageStyles } from './index-page.styles';
import {
  collectErrorDetailsCode,
  effectLoaderCode,
  errorBoundaryCode,
  remixThrowCode,
  routeLoaderCode,
  useErrorDetailsCode,
} from './index-page-code-samples';

export const IndexPage: FunctionComponent = () => {
  const css = indexPageStyles();

  return (
    <div className={css.root}>
      <Title size="3xl">
        A showcase for errors reporting using{' '}
        <Link href="https://effect.website/docs/introduction">Effect</Link>.
      </Title>
      <div>Using:</div>
      <ul className={css.technoList}>
        <li>
          <Link href="https://remix.run/docs/en/main">Remix</Link>.
        </li>
        <li>
          <Link href="https://github.com/jpb06/effect-errors">
            effect-errors
          </Link>
          .
        </li>
      </ul>
      <Title size="xl">Custom remix loader</Title>
      <div>
        We will create a custom loader taking an effect as parameter and
        returning a promise containing data or an object containing the effect
        error details.
      </div>
      <Box className={css.codeSamples}>
        <CodeFromString title="Effect loader" code={effectLoaderCode} />
        <Title size="base">Capturing errors</Title>
        <div>
          If the effect fails, we retrieve errors data and related code.
          <ul className={css.list}>
            <li>
              <span className={css.listItem}>
                In dev mode, effect-errors will use sourcemaps to extract code
                excerpts related to the error.
              </span>
            </li>
            <li>
              <span className={css.listItem}>
                In production however, we must fetch the map file (uploaded in
                our example on cloudflare R2), and read it to extract sources.
              </span>
            </li>
          </ul>
        </div>
        <CodeFromString
          title="Collect error details"
          code={collectErrorDetailsCode}
        />
        <Title size="base">Throwing if there is an error</Title>
        <div>
          We need to pipe on the promise because remix expects us to throw a
          `json` function result from the loader for errors:
        </div>
        <CodeFromString title="Remix throw" code={remixThrowCode} />
      </Box>
      <Title size="xl">Using our loader</Title>
      <div>We can then use our loader inside a route:</div>
      <Box className={css.codeSamples}>
        <CodeFromString title="Route loader" code={routeLoaderCode} />
      </Box>
      <Title size="xl">Displaying effect error details</Title>
      <div>
        Finally, we can use an error boundary to display effect errors details.
        Let's start by creating a hook to transform error data:
      </div>
      <div className={css.codeSamples}>
        <CodeFromString
          title="useErrorsDetails hook"
          code={useErrorDetailsCode}
        />
        <div>We can then use it to display our errors!</div>
        <CodeFromString title="Remix error boundary" code={errorBoundaryCode} />
      </div>
    </div>
  );
};
