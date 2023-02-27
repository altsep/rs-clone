import { IChat, TLastMessage, TNumberOfUnreadMessages } from './data';

interface ResponseError extends Error {
  status?: number;
}

interface ISetLastMessages {
  chats: IChat[];
  numberOfUnreadMessagesInChats: TNumberOfUnreadMessages[] | null;
  lastMessagesInChats: TLastMessage[] | null;
  idAuthorizedUser: number;
}

export type { ResponseError, ISetLastMessages };
