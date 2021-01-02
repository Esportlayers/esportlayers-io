export interface VoteRoundData {
  status: 'stream_delay' | 'betting' | 'game_running' | 'finished';
  overlayVisibleUntil: number;
  overlayVisible: boolean;
  streamDelay: number;
  votingStartingAt: number;
  votingTimeRemaining: number;
  votingPossibleUntil: number;
  voteCreated: number;
  totalVotesCount: number;
  chatterCounts: number;
  teamACount: number;
  teamAVoters: string[];
  teamBCount: number;
  teamBVoters: string[];
  allVoters: string[];
  winner: null | string;
  winnerAnnouncement: null | number;
  announcedStart: boolean;
  announcedVoteEnd: boolean;
  announcedWinner: boolean;
}

enum ACTIONS {
  UPDATE_VOTE_STATE = 'UPDATE_VOTE_STATE',
}

interface UpdateVoteState {
  type: typeof ACTIONS.UPDATE_VOTE_STATE;
  state: VoteRoundData | null;
}

export type VoteState = VoteRoundData | null;

export const initialVoteState: VoteState = null;

export const voteReducer = (state: VoteState, action: UpdateVoteState) => {
  switch (action.type) {
    case ACTIONS.UPDATE_VOTE_STATE:
      return action.state;
    default:
      return state;
  }
};

export function newState(state: VoteRoundData | null): UpdateVoteState {
  return {
    state,
    type: ACTIONS.UPDATE_VOTE_STATE,
  };
}
