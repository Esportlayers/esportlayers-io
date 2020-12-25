import React, { createContext, Dispatch, ReactElement, ReactNode, useContext, useEffect, useReducer } from 'react';
import { newState, State } from './VoteState';
import Tether from './../Tether';
import { useTetherMessageListener } from '../ContextProvider';
import { BettingMessage, isBettingMessage } from '../State';

export const VoteContext = createContext({});

export const useVoteValue = (): [State, Dispatch<{}>] => useContext(VoteContext) as [State, Dispatch<{}>];

interface Props {
  children: ReactNode;
}

function VoteUpdateListener({ children }: Props): ReactElement {
  const [, dispatch] = useVoteValue();
  const { value } = useTetherMessageListener<BettingMessage>(isBettingMessage) || { value: null };
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
