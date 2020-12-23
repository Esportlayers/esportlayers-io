import { DraftData, GameData, GameState, MorphlingEventTypes, PlayerState } from '@esportlayers/morphling';
import dayjs from 'dayjs';

enum ACTIONS {
  NEW_MESSAGE = 'NEW_MESSAGE',
}
export interface BaseMessage {
  type: MorphlingEventTypes;
  date: number;
}
export interface GsiConnectedMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_connected;
  value: boolean;
}
export interface GsiAegisInfoMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_aegis_available;
  value: boolean;
}
export interface GsiActivityMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_game_activity;
  value: 'playing' | 'observing' | null;
}
export interface GsiGameDataMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_gamedata;
  value: GameData | null;
}
export interface GsiGamePausedMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_game_paused;
  value: boolean;
}
export interface GsiGameStateMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_game_state;
  value: null | GameState;
}
export interface GsiGameWinnerMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_game_winner;
  value: {
    isPlayingWin: boolean;
    winnerTeam: 'none' | 'radiant' | 'dire';
  };
}
export interface GsiGameWinChanceMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_game_win_chance;
  value: number;
}
export interface GsiPlayerStateMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_player_state;
  value: PlayerState[];
}
export interface GsiRoshanMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_roshan;
  value: {
    state: 'aegis' | 'alive' | 'respawn_base' | 'respawn_variable';
    respawnTime: number;
  };
}
export interface GsiDraftMessage extends BaseMessage {
  type: MorphlingEventTypes.gsi_draft;
  value: DraftData | null;
}

export type Message =
  | GsiConnectedMessage
  | GsiAegisInfoMessage
  | GsiActivityMessage
  | GsiGameDataMessage
  | GsiGamePausedMessage
  | GsiGameStateMessage
  | GsiGameWinnerMessage
  | GsiGameWinChanceMessage
  | GsiPlayerStateMessage
  | GsiRoshanMessage
  | GsiDraftMessage;

export function isGsiConnectedMessage(msg: Message | null): msg is GsiConnectedMessage {
  return msg?.type === MorphlingEventTypes.gsi_connected;
}

export function isGsiAegisMessage(msg: Message | null): msg is GsiAegisInfoMessage {
  return msg?.type === MorphlingEventTypes.gsi_aegis_available;
}

export function isGsiActivityMessage(msg: Message | null): msg is GsiActivityMessage {
  return msg?.type === MorphlingEventTypes.gsi_game_activity;
}

export function isGsiGameDataMessage(msg: Message | null): msg is GsiGameDataMessage {
  return msg?.type === MorphlingEventTypes.gsi_gamedata;
}

export function isGsiGamePausedMessage(msg: Message | null): msg is GsiGamePausedMessage {
  return msg?.type === MorphlingEventTypes.gsi_game_paused;
}

export function isGsiGameStateMessage(msg: Message | null): msg is GsiGameStateMessage {
  return msg?.type === MorphlingEventTypes.gsi_game_state;
}

export function isGsiGameWinnerMessage(msg: Message | null): msg is GsiGameWinnerMessage {
  return msg?.type === MorphlingEventTypes.gsi_game_winner;
}

export function isGsiGameWinChanceMessage(msg: Message | null): msg is GsiGameWinChanceMessage {
  return msg?.type === MorphlingEventTypes.gsi_game_win_chance;
}

export function isGsiGamePlayerMessage(msg: Message | null): msg is GsiPlayerStateMessage {
  return msg?.type === MorphlingEventTypes.gsi_player_state;
}

export function isGsiRoshanMessage(msg: Message | null): msg is GsiRoshanMessage {
  return msg?.type === MorphlingEventTypes.gsi_roshan;
}

export function isGsiDraftMessage(msg: Message | null): msg is GsiDraftMessage {
  return msg?.type === MorphlingEventTypes.gsi_draft;
}

interface NewMessageAction {
  type: typeof ACTIONS.NEW_MESSAGE;
  message: Message;
}

export interface State {
  messages: Message[];
}

export const initialState: State = {
  messages: [],
};

export const reducer = (state: State, action: NewMessageAction) => {
  switch (action.type) {
    case ACTIONS.NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    default:
      return state;
  }
};

export function newMessage(message: Message): NewMessageAction {
  return {
    message: {
      ...message,
      date: dayjs().unix(),
    },
    type: ACTIONS.NEW_MESSAGE,
  };
}
