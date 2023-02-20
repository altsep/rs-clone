import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KEY_LOCAL_STORAGE, LSKeys, ReducerNames } from '../../constants';
import { IChat, IMessage } from '../../types/data';
import { TChatsState, TNumberOfNewMessagesInChat } from '../../types/state';

const getNumberOfNewMessagesInChats = localStorage.getItem(`${LSKeys.numberOfNewMessagesInChats}_${KEY_LOCAL_STORAGE}`);
const getTotalNumberOfNewMessages = localStorage.getItem(`${LSKeys.totalNumberOfNewMessages}_${KEY_LOCAL_STORAGE}`);

const initialState: TChatsState = {
  chats: [],
  activeChat: null,
  activeChatIndex: -1,
  activeChatMessages: [],
  // CHANGE_NAME

  numberOfNewMessagesInChats: getNumberOfNewMessagesInChats
    ? (JSON.parse(getNumberOfNewMessagesInChats) as TNumberOfNewMessagesInChat[])
    : [],
  totalNumberOfNewMessages: getTotalNumberOfNewMessages ? (JSON.parse(getTotalNumberOfNewMessages) as number) : 0,
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
      }
      state.numberOfNewMessagesInChats = state.numberOfNewMessagesInChats.filter((numberOfNewMessagesInChat) => {
        if (numberOfNewMessagesInChat.userId === action.payload) {
          state.totalNumberOfNewMessages -= numberOfNewMessagesInChat.counter;
          return false;
        }
        return true;
      });
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
      } else {
        const index = state.numberOfNewMessagesInChats.findIndex((obj) => obj.userId === action.payload.userId);
        if (index !== -1) {
          state.numberOfNewMessagesInChats[index].counter += 1;
        } else {
          state.numberOfNewMessagesInChats.push({ userId: action.payload.userId, counter: 1 });
        }
        state.totalNumberOfNewMessages += 1;
      }
    },
    addMessageSend(state, action: PayloadAction<IMessage>) {
      if (state.activeChatIndex !== -1 && state.activeChat) {
        state.chats[state.activeChatIndex].messages.push(action.payload);
        state.activeChat.messages.push(action.payload);
        state.activeChatMessages.push(action.payload);
      }
    },
    addChatInState(state, action: PayloadAction<IChat>) {
      state.chats.push(action.payload);
    },
    // CHANGE_NAME
    setNumberOfNewMessagesInChats(state, action: PayloadAction<TNumberOfNewMessagesInChat[]>) {
      state.numberOfNewMessagesInChats = action.payload;
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
  setNumberOfNewMessagesInChats,
} = chatsStateSlice.actions;

export const chatsState = chatsStateSlice.reducer;
