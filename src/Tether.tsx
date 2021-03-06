import { EventTypes, initialState, reducer } from './State';
import React, { ReactNode } from 'react';

import ContextProvider from './ContextProvider';

interface Props {
  children: ReactNode;
  url: string;
  scopes?: EventTypes[];
}

const Tether: React.FC<Props> = ({ children, url, scopes }) => {
  const query = scopes ? '?scopes=' + scopes.join('&scopes=') : '';
  return (
    <ContextProvider initialState={initialState} reducer={reducer} url={url + query}>
      {children}
    </ContextProvider>
  );
};

export default Tether;
