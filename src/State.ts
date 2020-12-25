import { DraftData, GameData, GameState, PlayerState } from '@esportlayers/morphling';
import dayjs from 'dayjs';
import { VoteRoundData } from './Vote/VoteState';

enum EventTypes {
  gsi_aegis_available = 'gsi_aegis_available',
  gsi_gamedata = 'gsi_gamedata',
  gsi_game_paused = 'gsi_game_paused',
  gsi_game_state = 'gsi_game_state',
  gsi_game_winner = 'gsi_game_winner',
  gsi_game_win_chance = 'gsi_game_win_chance',
  gsi_game_activity = 'gsi_game_activity',
  gsi_draft = 'gsi_draft',
  gsi_player_state = 'gsi_player_state',
  gsi_roshan = 'gsi_roshan',
  gsi_connected = 'gsi_connected',
  gsi_match_id = 'gsi_match_id',
  betting_v2 = 'betting_v2',
}

enum ACTIONS {
  NEW_MESSAGE = 'NEW_MESSAGE',
}
export interface BaseMessage {
  type: EventTypes;
  date: number;
}
export interface GsiConnectedMessage extends BaseMessage {
  type: EventTypes.gsi_connected;
  value: boolean;
}
export interface GsiAegisInfoMessage extends BaseMessage {
  type: EventTypes.gsi_aegis_available;
  value: boolean;
}
export interface GsiActivityMessage extends BaseMessage {
  type: EventTypes.gsi_game_activity;
  value: 'playing' | 'observing' | null;
}
export interface GsiGameDataMessage extends BaseMessage {
  type: EventTypes.gsi_gamedata;
  value: GameData | null;
}
export interface GsiGamePausedMessage extends BaseMessage {
  type: EventTypes.gsi_game_paused;
  value: boolean;
}
export interface GsiGameStateMessage extends BaseMessage {
  type: EventTypes.gsi_game_state;
  value: null | GameState;
}
export interface GsiGameWinnerMessage extends BaseMessage {
  type: EventTypes.gsi_game_winner;
  value: {
    isPlayingWin: boolean;
    winnerTeam: 'none' | 'radiant' | 'dire';
  };
}
export interface GsiGameWinChanceMessage extends BaseMessage {
  type: EventTypes.gsi_game_win_chance;
  value: number;
}
export interface GsiPlayerStateMessage extends BaseMessage {
  type: EventTypes.gsi_player_state;
  value: PlayerState[];
}
export interface GsiRoshanMessage extends BaseMessage {
  type: EventTypes.gsi_roshan;
  value: {
    state: 'aegis' | 'alive' | 'respawn_base' | 'respawn_variable';
    respawnTime: number;
  };
}
export interface GsiDraftMessage extends BaseMessage {
  type: EventTypes.gsi_draft;
  value: DraftData | null;
}
export interface GsiMatchIdMessage extends BaseMessage {
  type: EventTypes.gsi_match_id;
  value: DraftData | null;
}
export interface BettingMessage extends BaseMessage {
  type: EventTypes.betting_v2;
  value: VoteRoundData | null;
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
  | GsiDraftMessage
  | GsiMatchIdMessage
  | BettingMessage;

export function isGsiConnectedMessage(msg: Message | null): msg is GsiConnectedMessage {
  return msg?.type === EventTypes.gsi_connected;
}

export function isGsiAegisMessage(msg: Message | null): msg is GsiAegisInfoMessage {
  return msg?.type === EventTypes.gsi_aegis_available;
}

export function isGsiActivityMessage(msg: Message | null): msg is GsiActivityMessage {
  return msg?.type === EventTypes.gsi_game_activity;
}

export function isGsiGameDataMessage(msg: Message | null): msg is GsiGameDataMessage {
  return msg?.type === EventTypes.gsi_gamedata;
}

export function isGsiGamePausedMessage(msg: Message | null): msg is GsiGamePausedMessage {
  return msg?.type === EventTypes.gsi_game_paused;
}

export function isGsiGameStateMessage(msg: Message | null): msg is GsiGameStateMessage {
  return msg?.type === EventTypes.gsi_game_state;
}

export function isGsiGameWinnerMessage(msg: Message | null): msg is GsiGameWinnerMessage {
  return msg?.type === EventTypes.gsi_game_winner;
}

export function isGsiGameWinChanceMessage(msg: Message | null): msg is GsiGameWinChanceMessage {
  return msg?.type === EventTypes.gsi_game_win_chance;
}

export function isGsiGamePlayerMessage(msg: Message | null): msg is GsiPlayerStateMessage {
  return msg?.type === EventTypes.gsi_player_state;
}

export function isGsiRoshanMessage(msg: Message | null): msg is GsiRoshanMessage {
  return msg?.type === EventTypes.gsi_roshan;
}

export function isGsiDraftMessage(msg: Message | null): msg is GsiDraftMessage {
  return msg?.type === EventTypes.gsi_draft;
}

export function isGsiMatchIdMessage(msg: Message | null): msg is GsiMatchIdMessage {
  return msg?.type === EventTypes.gsi_match_id;
}

export function isBettingMessage(msg: Message | null): msg is BettingMessage {
  return msg?.type === EventTypes.betting_v2;
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
