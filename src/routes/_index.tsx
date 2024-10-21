//import type { MetaFunction } from '@remix-run/node';

import { IndexPage } from '@components/routes/index-page';

// export const meta: MetaFunction = () => [
//   { title: 'Effect errors' },
//   { name: 'description', content: 'Toying with errors reporting' },
// ];

const Index = IndexPage;

// biome-ignore lint/style/noDefaultExport: <explanation>
export default Index;
