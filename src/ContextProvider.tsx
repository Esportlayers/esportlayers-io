import {
  EventTypes,
  Message,
  State,
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
  isKeywordMessageOverlay,
  isOverlayMessage,
  isStatsOverlayMessage,
  newMessage,
} from './State';
import React, { Dispatch, ReactElement, createContext, useContext, useEffect, useReducer, useState } from 'react';

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

export function MessageHandler({ url }: { url: string }): ReactElement | null {
  const [, dispatch] = useTetherValue();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setMounted(false);
    setTimeout(() => setMounted(true), 1);
  }, [url]);

  const onMessage = (msg: string) => {
    try {
      const { type, ...props } = JSON.parse(msg);
      dispatch(newMessage({ ...props, type }));
    } catch (Error) {
      // tslint:disable-next-line
      throw new Error('MessageHandler :: Invalid message - ', msg);
    }
  };

  if (mounted) {
    return <Websocket key={url} url={url} onMessage={onMessage} />;
  }

  return null;
}

export function useTetherListener(): Message | null {
  const [{ message }] = useTetherValue();
  return message;
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
  [EventTypes.keyword_message_overlay]: isKeywordMessageOverlay,
  [EventTypes.overlay]: isOverlayMessage,
  [EventTypes.dota_wl_reset]: isDotaWLResetMessage,
  [EventTypes.statsoverlay]: isStatsOverlayMessage,
};

export function useTetherMessageListener<T = Message>(type: EventTypes, noCache?: boolean): T | null {
  const msg = useTetherListener();
  const [{ lastMessages }] = useTetherValue();
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    if (msg && listener[type](msg)) {
      setValue((msg as unknown) as T);
    }
  }, [msg]);

  let val = value;

  if (!noCache && !val) {
    val = ({ value: lastMessages[type], type } as unknown) as T;
  }

  return val;
}
