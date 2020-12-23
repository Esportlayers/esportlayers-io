import React, { ReactNode } from 'react';
import ContextProvider from './ContextProvider';
import { initialState, reducer } from './State';

interface Props {
  children: ReactNode;
  url: string;
}

const Tether: React.FC<Props> = ({ children, url }) => (
  <ContextProvider initialState={initialState} reducer={reducer} url={url}>
    {children}
  </ContextProvider>
);

export default Tether;
