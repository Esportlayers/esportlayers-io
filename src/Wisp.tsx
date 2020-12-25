import React, { ReactNode } from 'react';
import VoteContext from './Vote/VoteContext';
import { reducer, initialState } from './Vote/VoteState';

interface Props {
  children: ReactNode;
  url: string;
}

const Wisp: React.FC<Props> = ({ children, url }) => (
  <VoteContext initialState={initialState} reducer={reducer} url={url}>
    {children}
  </VoteContext>
);

export default Wisp;
