import type { MetaFunction } from '@remix-run/node';

import { Code } from '../components/code/Code';
import { Title } from '../components/title/Title';

import {
  effectLoaderCode,
  errorBoundaryCode,
  remixThrowCode,
  routeLoaderCode,
} from './index-code-samples';

export const meta: MetaFunction = () => [
  { title: 'Effect errors' },
  { name: 'description', content: 'Toying with errors reporting' },
];

const Index = () => (
  <div className="flex flex-col md:mx-0">
    <Title size="3xl" className="ml-4">
      A showcase for errors reporting using{' '}
      <a
        className="text-yellow-500 underline"
        href="https://effect.website/docs/introduction"
      >
        Effect
      </a>
      .
    </Title>
    <div className="ml-4">
      <div className="mt-5">Using:</div>
      <ul className="ml-4 list-disc">
        <li>
          <a
            className="text-yellow-500 underline"
            href="https://remix.run/docs/en/main"
          >
            Remix
          </a>
        </li>
        <li>
          <a
            className="text-yellow-500 underline"
            href="https://github.com/jpb06/effect-errors"
          >
            effect-errors
          </a>
        </li>
      </ul>
    </div>
    <Title size="2xl" className="ml-4 mt-4">
      Custom loader
    </Title>
    <div className="my-2 ml-4 md:w-[52rem]">
      We will use a custom loader taking an effect as parameter and returning a
      promise containing data or an object containing the effect error details.
    </div>
    <div className="my-2 flex flex-col gap-2">
      <Code
        title="Effect loader"
        code={effectLoaderCode}
        className="self-center"
      />
      <Code title="Remix throw" code={remixThrowCode} className="self-center" />
    </div>
    <Title size="2xl" className="ml-4 mt-4">
      Using our loader
    </Title>
    <div className="my-2 ml-4 md:w-[52rem]">
      We can then use our loader inside a route:
    </div>
    <div className="my-2">
      <Code
        title="Route loader"
        code={routeLoaderCode}
        className="self-center"
      />
    </div>
    <Title size="2xl" className="ml-4 mt-4">
      Displaying effect error details
    </Title>
    <div className="my-2 ml-4 md:w-[52rem]">
      We can then use an error boundary to display effect errors details:
    </div>
    <div className="my-2">
      <Code
        title="Remix error boundary"
        code={errorBoundaryCode}
        className="self-center"
      />
    </div>
  </div>
);
export default Index;
