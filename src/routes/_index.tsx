import type { MetaFunction } from '@remix-run/node';

import { Title } from '../components/title/Title';

export const meta: MetaFunction = () => [
  { title: 'Effect errors' },
  { name: 'description', content: 'Toying with errors reporting' },
];

const Index = () => (
  <div className="self-center">
    <Title size="3xl">
      A showcase for errors reporting using{' '}
      <a
        className="text-yellow-500 underline"
        href="https://effect.website/docs/introduction"
      >
        Effect
      </a>
      .
    </Title>
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
);
export default Index;
