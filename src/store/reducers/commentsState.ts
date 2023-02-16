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
    updateCommentInState: (state, action: PayloadAction<IComment>) => {
      state.comments = state.comments.map((comment) => (comment.id === action.payload.id ? action.payload : comment));
    },
    filterCommentsByPostId: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((comment) => comment.postId !== action.payload);
    },
  },
});

export const {
  commentsLoadingSuccess,
  addCommentInState,
  removeCommentInState,
  updateCommentInState,
  filterCommentsByPostId,
} = commentsStateSlice.actions;

export const commentsState = commentsStateSlice.reducer;
