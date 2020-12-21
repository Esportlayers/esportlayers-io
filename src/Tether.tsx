import { ReactElement, ReactNode } from 'react';
import React = require('react');
import ContextProvider from './ContextProvider';
import { initialState, reducer } from './State';

interface Props {
  children: ReactNode;
  url: string;
}

export default function Tether({ children, url }: Props): ReactElement {
  return (
    <ContextProvider initialState={initialState} reducer={reducer} url={url}>
      {children}
    </ContextProvider>
  );
}
