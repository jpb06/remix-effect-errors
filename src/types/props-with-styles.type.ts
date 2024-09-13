import { Styles } from '@panda/css';

export type PropsWithStyles<P = unknown> = P & {
  styles?: Styles;
};
