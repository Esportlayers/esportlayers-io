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
  state: VoteRoundData;
}

export interface State {
  state: VoteRoundData | null;
}

export const initialState: State = {
  state: null,
};

export const reducer = (state: State, action: UpdateVoteState) => {
  switch (action.type) {
    case ACTIONS.UPDATE_VOTE_STATE:
      return action.state;
    default:
      return state;
  }
};

export function newState(state: VoteRoundData): UpdateVoteState {
  return {
    state,
    type: ACTIONS.UPDATE_VOTE_STATE,
  };
}
