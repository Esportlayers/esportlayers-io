import React, { ReactElement, useEffect, useState } from 'react';
// @ts-ignore
import Websocket from 'react-websocket';
import { useTetherValue } from './ContextProvider';
import { newMessage, Message } from './State';

export default function MessageHandler({ url }: { url: string }): ReactElement {
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
