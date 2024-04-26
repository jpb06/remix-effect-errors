import type { MetaFunction } from '@remix-run/node';

import { Title } from '../components/title/Title';

export const meta: MetaFunction = () => [
  { title: 'Effect errors' },
  { name: 'description', content: 'Toying with errors reporting' },
];

export default function Index() {
  return (
    <div className="self-center">
      <Title>Cool</Title>
    </div>
  );
}
