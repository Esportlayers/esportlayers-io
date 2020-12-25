import React, { ReactNode } from 'react';
import VoteContext from './Vote/VoteContext';
import { voteReducer, initialVoteState } from './Vote/VoteState';

interface Props {
  children: ReactNode;
  url: string;
}

const Wisp: React.FC<Props> = ({ children, url }) => (
  <VoteContext initialState={initialVoteState} reducer={voteReducer} url={url}>
    {children}
  </VoteContext>
);

export default Wisp;
