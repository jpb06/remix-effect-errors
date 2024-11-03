import type { Styles } from '@panda/css';

export type PropsWithPandaStyles<P = unknown> = P & {
  styles?: Styles;
};
