import React, { createContext, Dispatch, ReactElement, ReactNode, useContext, useEffect, useReducer } from 'react';
import { newState, VoteState } from './VoteState';
import Tether from './../Tether';
import { useTetherMessageListener } from '../ContextProvider';
import { BettingMessage, EventTypes } from '../State';

export const VoteContext = createContext({});

export const useVoteValue = (): [VoteState, Dispatch<{}>] => useContext(VoteContext) as [VoteState, Dispatch<{}>];

interface Props {
  children: ReactNode;
}

function VoteUpdateListener({ children }: Props): ReactElement {
  const [, dispatch] = useVoteValue();
  const { value } = useTetherMessageListener<BettingMessage>(EventTypes.betting_v2) || { value: null };
  useEffect(() => dispatch(newState(value)), [dispatch, value]);
  return <>{children}</>;
}

// @ts-ignore
export const ContextProvider = ({ reducer, initialState, children, url }) => {
  return (
    <Tether url={url}>
      <VoteContext.Provider value={useReducer(reducer, initialState)}>
        <VoteUpdateListener>{children}</VoteUpdateListener>
      </VoteContext.Provider>
    </Tether>
  );
};
export default ContextProvider;
