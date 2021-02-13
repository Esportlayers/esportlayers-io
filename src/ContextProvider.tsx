import React, { createContext, Dispatch, ReactElement, useContext, useEffect, useReducer, useState } from 'react';
import {
  EventTypes,
  isBettingMessage,
  isDotaWLResetMessage,
  isGsiActivityMessage,
  isGsiAegisMessage,
  isGsiConnectedMessage,
  isGsiDraftMessage,
  isGsiGameDataMessage,
  isGsiGamePausedMessage,
  isGsiGamePlayerMessage,
  isGsiGamePlayersMessage,
  isGsiGameStateMessage,
  isGsiGameWinChanceMessage,
  isGsiGameWinnerMessage,
  isGsiMatchIdMessage,
  isGsiRoshanMessage,
  isKeywordMessage,
  isOverlayMessage,
  isStatsOverlayMessage,
  Message,
  newMessage,
  State,
} from './State';
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

const listener = {
  [EventTypes.betting_v2]: isBettingMessage,
  [EventTypes.gsi_aegis_available]: isGsiAegisMessage,
  [EventTypes.gsi_connected]: isGsiConnectedMessage,
  [EventTypes.gsi_draft]: isGsiDraftMessage,
  [EventTypes.gsi_game_activity]: isGsiActivityMessage,
  [EventTypes.gsi_game_paused]: isGsiGamePausedMessage,
  [EventTypes.gsi_game_state]: isGsiGameStateMessage,
  [EventTypes.gsi_game_win_chance]: isGsiGameWinChanceMessage,
  [EventTypes.gsi_game_winner]: isGsiGameWinnerMessage,
  [EventTypes.gsi_gamedata]: isGsiGameDataMessage,
  [EventTypes.gsi_match_id]: isGsiMatchIdMessage,
  [EventTypes.gsi_player_state]: isGsiGamePlayerMessage,
  [EventTypes.gsi_players_state]: isGsiGamePlayersMessage,
  [EventTypes.gsi_roshan]: isGsiRoshanMessage,
  [EventTypes.keyword_message]: isKeywordMessage,
  [EventTypes.overlay]: isOverlayMessage,
  [EventTypes.dota_wl_reset]: isDotaWLResetMessage,
  [EventTypes.statsoverlay]: isStatsOverlayMessage,
};

export function useTetherMessageListener<T = Message>(type: EventTypes): T | null {
  const msg = useTetherListener();
  const [{ lastMessages }] = useTetherValue();
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    if (msg && listener[type](msg)) {
      setValue((msg as unknown) as T);
    }
  }, [msg]);

  return value || (({ value: lastMessages[type], type } as unknown) as T);
}
