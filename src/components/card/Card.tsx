import type { PropsWithChildren } from 'react';

type CardProps = {
  title: string;
};

export const Card = ({ title, children }: PropsWithChildren<CardProps>) => (
  <div className="card mx-10 w-auto bg-gradient-to-tl from-indigo-950 to-cyan-900 shadow-xl md:mx-0 md:w-[40rem]">
    <div className="card-body">
      <h2 className="card-title text-white">{title}</h2>
      {children}
    </div>
  </div>
);
