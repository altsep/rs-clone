import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KEY_LOCAL_STORAGE, LSKeys, ReducerNames } from '../../constants';
import { IChat, IMessage, TLastMessage, TNumberOfUnreadMessages } from '../../types/data';
import { TChatsState } from '../../types/state';
import { findLastIndex } from '../../utils/common';

const initialState: TChatsState = {
  chats: [],
  activeChat: null,
  activeChatIndex: -1,
  activeChatMessages: [],
  numberOfUnreadMessagesInChats: null,
  totalNumberOfUnreadMessages: null,
  lastMessagesInChats: null,
};

const chatsStateSlice = createSlice({
  name: ReducerNames.chats,
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<IChat[]>) {
      state.chats = action.payload;
    },
    setActiveChat(state, action: PayloadAction<number>) {
      state.activeChat =
        state.chats.find((chat, i) => {
          state.activeChatIndex = i;
          return chat.userIds.includes(action.payload);
        }) || null;

      if (state.chats.length > 0 && state.activeChatIndex !== -1) {
        state.activeChatMessages = state.chats[state.activeChatIndex].messages;
        if (state.activeChatMessages.length > 0 && state.lastMessagesInChats) {
          state.lastMessagesInChats = state.lastMessagesInChats.map((lastMessage) => {
            if (lastMessage.chatId === state.activeChat?.id) {
              return {
                chatId: lastMessage.chatId,
                idLastMessage: state.activeChatMessages[state.activeChatMessages.length - 1].id,
                userId: lastMessage.userId,
              };
            }
            return lastMessage;
          });
        }
      }
    },
    resetActiveChat(state) {
      state.activeChat = null;
      state.activeChatIndex = -1;
    },
    addMessageWatch(state, action: PayloadAction<IMessage>) {
      const chatIndex = state.chats.findIndex((chat) => chat.userIds.includes(action.payload.userId));
      state.chats[chatIndex].messages.push(action.payload);
      if (state.activeChat?.userIds.includes(action.payload.userId)) {
        state.activeChat.messages.push(action.payload);
        state.activeChatMessages.push(action.payload);
        if (state.lastMessagesInChats) {
          state.lastMessagesInChats = state.lastMessagesInChats.map((lastMessage) => {
            if (lastMessage.chatId === state.activeChat?.id) {
              return { chatId: lastMessage.chatId, idLastMessage: action.payload.id, userId: lastMessage.userId };
            }
            return lastMessage;
          });
        }
      }
    },
    addMessageSend(state, action: PayloadAction<IMessage>) {
      if (state.activeChatIndex !== -1 && state.activeChat) {
        state.chats[state.activeChatIndex].messages.push(action.payload);
        state.activeChat.messages.push(action.payload);
        state.activeChatMessages.push(action.payload);

        if (state.lastMessagesInChats) {
          state.lastMessagesInChats = state.lastMessagesInChats.map((lastMessage) => {
            if (lastMessage.chatId === state.activeChat?.id) {
              return { chatId: lastMessage.chatId, idLastMessage: action.payload.id, userId: lastMessage.userId };
            }
            return lastMessage;
          });
        }
      }
    },
    addChatInState(state, action: PayloadAction<IChat>) {
      state.chats.push(action.payload);
    },
    setLastMessagesInChats(state, action: PayloadAction<number>) {
      const getLastMessagesInChats = localStorage.getItem(
        `${LSKeys.lastMessages}_${action.payload}_${KEY_LOCAL_STORAGE}`
      );
      state.lastMessagesInChats = getLastMessagesInChats ? (JSON.parse(getLastMessagesInChats) as TLastMessage[]) : [];
    },
    setNumberOfUnreadMessagesInChats(state, action: PayloadAction<TLastMessage[]>) {
      state.numberOfUnreadMessagesInChats = action.payload.reduce<TNumberOfUnreadMessages[]>((acc, lastMessage) => {
        const currentChat = state.chats.find((chat) => chat.id === lastMessage.chatId);
        if (currentChat) {
          const indexOfLastStoredMessage = findLastIndex(
            currentChat.messages,
            (message) => message.id === lastMessage.idLastMessage
          );
          if (indexOfLastStoredMessage < currentChat.messages.length - 1) {
            const arg: TNumberOfUnreadMessages = {
              chatId: currentChat.id,
              userId: lastMessage.userId,
              counter: currentChat.messages.length - 1 - indexOfLastStoredMessage,
            };
            acc.push(arg);
          }
        }
        return acc;
      }, []);
      state.totalNumberOfUnreadMessages = state.numberOfUnreadMessagesInChats.reduce((acc, numberOfUnreadMessages) => {
        acc += numberOfUnreadMessages.counter;
        return acc;
      }, 0);
    },
  },
});

export const {
  setChats,
  addMessageWatch,
  addMessageSend,
  setActiveChat,
  addChatInState,
  resetActiveChat,
  setNumberOfUnreadMessagesInChats,
  setLastMessagesInChats,
} = chatsStateSlice.actions;

export const chatsState = chatsStateSlice.reducer;
