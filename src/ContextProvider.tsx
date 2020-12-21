import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { State } from './State';
import MessageHandler from './TetherMessage';

export function getWSUrl(url: string): string {
  const protocol = url.substring(0, url.indexOf('://'));
  const rawUrl = url.substring(protocol.length + 3);
  if (protocol === 'https') {
    return 'wss://' + rawUrl;
  }
  return 'ws://' + rawUrl;
}

export const TetherContext = createContext({});

// @ts-ignore
export const ContextProvider = ({ reducer, initialState, children, url }) => {
  return (
    <TetherContext.Provider value={useReducer(reducer, initialState)}>
      <MessageHandler url={url} />

      {children}
    </TetherContext.Provider>
  );
};
export default ContextProvider;

export const useTetherValue = (): [State, Dispatch<{}>] => useContext(TetherContext) as [State, Dispatch<{}>];
