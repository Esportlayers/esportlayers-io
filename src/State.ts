import dayjs from 'dayjs';

enum ACTIONS {
  NEW_MESSAGE = 'NEW_MESSAGE',
}

export enum MessageType {
  gsi_connected = 'gsi_connected',
}

export interface BaseMessage {
  type: MessageType;
  date: number;
}

export interface GsiConnectedMessage extends BaseMessage {
  type: MessageType.gsi_connected;
  value: boolean;
}

export type Message = GsiConnectedMessage;

export function isGsiConnectedMessage(msg: Message): msg is GsiConnectedMessage {
  return msg.type === MessageType.gsi_connected;
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
