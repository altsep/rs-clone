import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { IChat, IMessage } from '../../types/data';
import { TChatsState } from '../../types/state';

const initialState: TChatsState = {
  chats: [],
  activeChat: null,
  activeChatIndex: -1,
  activeChatMessages: [],
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
    },
    addMessageWatch(state, action: PayloadAction<IMessage>) {
      const chatIndex = state.chats.findIndex((chat) => chat.userIds.includes(action.payload.userId));
      state.chats[chatIndex].messages.push(action.payload);
      if (state.activeChat) {
        state.activeChat.messages.push(action.payload);
      }

      if (chatIndex === state.activeChatIndex) {
        state.activeChatMessages.push(action.payload);
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
  },
});

export const { setChats, addMessageWatch, addMessageSend, setActiveChat, addChatInState } = chatsStateSlice.actions;

export const chatsState = chatsStateSlice.reducer;
