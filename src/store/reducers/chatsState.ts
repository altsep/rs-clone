import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { IChat, IMessage } from '../../types/data';
import { TChatsState } from '../../types/state';

const initialState: TChatsState = {
  chats: [],
  currentChatIndex: 0,
  currentChatMessages: [],
};

const chatsStateSlice = createSlice({
  name: ReducerNames.chats,
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<IChat[]>) {
      state.chats = action.payload;
    },
    setCurrentChat(state, action: PayloadAction<number>) {
      state.currentChatIndex = state.chats.findIndex((chat) => chat.userIds.includes(action.payload));

      if (state.chats.length > 0) {
        state.currentChatMessages = state.chats[state.currentChatIndex].messages;
      }
    },
    addMessage(state, action: PayloadAction<IMessage>) {
      const chatIndex = state.chats.findIndex((chat) => chat.userIds.includes(action.payload.userId));
      state.chats[chatIndex].messages.push(action.payload);

      if (chatIndex === state.currentChatIndex) {
        state.currentChatMessages.push(action.payload);
      }
    },
  },
});

export const { setChats, addMessage, setCurrentChat } = chatsStateSlice.actions;

export const chatsState = chatsStateSlice.reducer;