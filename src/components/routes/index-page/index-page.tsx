import { CodeFromString } from '@components/design-system/code';
import { Link } from '@components/design-system/link';
import { Title } from '@components/design-system/title';
import { Box } from '@panda/jsx';
import {
  effectLoaderCode,
  errorBoundaryCode,
  remixThrowCode,
  routeLoaderCode,
  useErrorDetailsCode,
} from './index-page-code-samples';
import { indexPageStyles } from './index-page.styles';

export const IndexPage = () => {
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
      <Title size="xl">Custom loader</Title>
      <div>
        We will use a custom loader taking an effect as parameter and returning
        a promise containing data or an object containing the effect error
        details.
      </div>
      <Box className={css.codeSamples}>
        <CodeFromString title="Effect loader" code={effectLoaderCode} />
        <CodeFromString title="Remix throw" code={remixThrowCode} />
      </Box>
      <Title size="xl">Using our loader</Title>
      <div>We can then use our loader inside a route:</div>
      <Box className={css.codeSamples}>
        <CodeFromString title="Route loader" code={routeLoaderCode} />
      </Box>
      <Title size="xl">Displaying effect error details</Title>
      <div>
        We can then use an error boundary to display effect errors details:
      </div>
      <div className={css.codeSamples}>
        <CodeFromString
          title="useErrorsDetails hook"
          code={useErrorDetailsCode}
        />
        <CodeFromString title="Remix error boundary" code={errorBoundaryCode} />
      </div>
    </div>
  );
};
