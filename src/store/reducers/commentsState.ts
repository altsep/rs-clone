import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { TCommentsState } from '../../types/state';
import { IComment } from '../../types/data';

const initialState: TCommentsState = {
  comments: [],
};

const commentsStateSlice = createSlice({
  name: ReducerNames.posts,
  initialState,
  reducers: {
    commentsLoadingSuccess: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    addCommentInState: (state, action: PayloadAction<IComment>) => {
      state.comments = [...state.comments, action.payload];
    },
    removeCommentInState: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    },
    editComment: (state, action: PayloadAction<IComment>) => {
      state.comments = state.comments.map((comment) => (comment.id === action.payload.id ? action.payload : comment));
    },
  },
});

export const { commentsLoadingSuccess, addCommentInState, removeCommentInState, editComment } =
  commentsStateSlice.actions;

export const commentsState = commentsStateSlice.reducer;
