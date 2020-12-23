import React, { createContext, Dispatch, ReactElement, useContext, useEffect, useReducer, useState } from 'react';
import { Message, newMessage, State } from './State';
// @ts-ignore
import Websocket from 'react-websocket';

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

export function MessageHandler({ url }: { url: string }): ReactElement {
  const [, dispatch] = useTetherValue();

  const onMessage = (msg: string) => {
    try {
      const { type, ...props } = JSON.parse(msg);
      dispatch(newMessage({ ...props, type }));
    } catch (Error) {
      // tslint:disable-next-line
      console.error('Invalid websocket message', msg);
    }
  };
  return <Websocket url={url} onMessage={onMessage} />;
}

export function useTetherListener(): Message | null {
  const [{ messages }] = useTetherValue();
  const [msg, setMsg] = useState<Message | null>(messages.length > 0 ? messages.slice(-1)[0] : null);

  useEffect(() => {
    const lastMessage = messages.slice(-1);
    const message = lastMessage.length > 0 ? lastMessage[0] : null;
    setMsg(message);
  }, [messages]);

  return msg;
}

type MessageListenerFN<T> = (msg: T) => msg is T;

export function useTetherMessageListener<T = Message>(listenerTypeCheck: MessageListenerFN<T>): T | null {
  const msg = useTetherListener();
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (msg && listenerTypeCheck(msg)) {
      setValue(msg);
    }
  }, [msg]);

  return value;
}
