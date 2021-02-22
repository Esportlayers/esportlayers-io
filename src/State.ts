import { DraftData, GameData, GameState, PlayerState } from '@esportlayers/morphling';

import { VoteRoundData } from './Vote/VoteState';
import dayjs from 'dayjs';

export enum EventTypes {
  gsi_aegis_available = 'gsi_aegis_available',
  gsi_gamedata = 'gsi_gamedata',
  gsi_game_paused = 'gsi_game_paused',
  gsi_game_state = 'gsi_game_state',
  gsi_game_winner = 'gsi_game_winner',
  gsi_game_win_chance = 'gsi_game_win_chance',
  gsi_game_activity = 'gsi_game_activity',
  gsi_draft = 'gsi_draft',
  gsi_player_state = 'gsi_player_state',
  gsi_players_state = 'gsi_players_state',
  gsi_roshan = 'gsi_roshan',
  gsi_connected = 'gsi_connected',
  gsi_match_id = 'gsi_match_id',
  betting_v2 = 'betting_v2',
  keyword_message = 'keyword_message',
  keyword_message_overlay = 'keyword_message_overlay',
  overlay = 'overlay',
  dota_wl_reset = 'dota_wl_reset',
  statsoverlay = 'statsoverlay',
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
  value: PlayerState;
}
export interface GsiPlayersStateMessage extends BaseMessage {
  type: EventTypes.gsi_players_state;
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
  value: number | null;
}
export interface BettingMessage extends BaseMessage {
  type: EventTypes.betting_v2;
  value: VoteRoundData | null;
}

export interface OverlayMessage extends BaseMessage {
  type: EventTypes.overlay;
  value: boolean;
}

export interface DotaWLResetMessage extends BaseMessage {
  type: EventTypes.dota_wl_reset;
  value: boolean;
}

export enum StatsOverlayMessages {
  heroStats = 'heroStats',
  playerCompareGraph = 'playerCompareGraph',
}
export interface BaseStatsOverlayMessage {
  type: StatsOverlayMessages;
}

export interface HeroStatsOverlayValue extends BaseStatsOverlayMessage {
  type: StatsOverlayMessages.heroStats;
  heroId: number;
  heroClass: string;
  totalGamesCount: number;
  matchCount: number;
  matchWins: number;
  banCount: number;
}

export interface PlayerCompareGraphValue extends BaseStatsOverlayMessage {
  StatsOverlayMessages: StatsOverlayMessages.playerCompareGraph;
  dataType: 'net_worth' | 'xpm' | 'gpm' | 'hero_damage' | 'runes_activated' | 'camps_stacked' | 'support_gold_spent';
  data: { absolute: number; percentage: number }[];
}

export interface StatsOverlayMessage extends BaseMessage {
  type: EventTypes.statsoverlay;
  value: HeroStatsOverlayValue | PlayerCompareGraphValue;
}

export function isHeroStatsOverlayMessage(value: StatsOverlayMessage['value']): value is HeroStatsOverlayValue {
  return value.type === StatsOverlayMessages.heroStats;
}

export function isPlayerCompareGraphMessage(value: StatsOverlayMessage['value']): value is PlayerCompareGraphValue {
  return value.type === StatsOverlayMessages.playerCompareGraph;
}

export interface KeywordMessage extends BaseMessage {
  type: EventTypes.keyword_message;
  value: {
    message: string;
    name: string;
    logo: string;
    time: number;
  };
}

export interface KeywordMessageOverlay extends BaseMessage {
  type: EventTypes.keyword_message_overlay;
  value: {
    message: string;
    name: string;
    logo: string;
    time: number;
  };
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
  | GsiPlayersStateMessage
  | GsiRoshanMessage
  | GsiDraftMessage
  | GsiMatchIdMessage
  | BettingMessage
  | KeywordMessage
  | OverlayMessage
  | DotaWLResetMessage
  | StatsOverlayMessage
  | KeywordMessageOverlay;

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

export function isGsiGamePlayersMessage(msg: Message | null): msg is GsiPlayersStateMessage {
  return msg?.type === EventTypes.gsi_players_state;
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

export function isKeywordMessage(msg: Message | null): msg is KeywordMessage {
  return msg?.type === EventTypes.keyword_message;
}

export function isKeywordMessageOverlay(msg: Message | null): msg is KeywordMessageOverlay {
  return msg?.type === EventTypes.keyword_message_overlay;
}

export function isOverlayMessage(msg: Message | null): msg is OverlayMessage {
  return msg?.type === EventTypes.overlay;
}

export function isDotaWLResetMessage(msg: Message | null): msg is DotaWLResetMessage {
  return msg?.type === EventTypes.dota_wl_reset;
}

export function isStatsOverlayMessage(msg: Message | null): msg is StatsOverlayMessage {
  return msg?.type === EventTypes.keyword_message;
}

interface NewMessageAction {
  type: typeof ACTIONS.NEW_MESSAGE;
  message: Message;
}

export interface State {
  messages: Message[];
  lastMessages: {
    [x: string]: any;
  };
}

export const initialState: State = {
  messages: [],
  lastMessages: {},
};

export const reducer = (state: State, action: NewMessageAction) => {
  switch (action.type) {
    case ACTIONS.NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
        lastMessages: {
          ...state.lastMessages,
          [action.message.type]: action.message.value,
        },
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
