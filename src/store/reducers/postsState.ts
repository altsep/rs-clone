import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { TPostsState } from '../../types/state';
import { IPost } from '../../types/data';

const initialState: TPostsState = {
  posts: [],
  currentProfilePosts: null,
};

const postsStateSlice = createSlice({
  name: ReducerNames.posts,
  initialState,
  reducers: {
    postsLoadingSuccess: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    defineCurrentProfilePosts: (state, action: PayloadAction<number[]>) => {
      state.currentProfilePosts = state.posts
        .slice()
        .reverse()
        .filter((post) => action.payload.includes(post.id));
    },
    addPostInState: (state, action: PayloadAction<IPost>) => {
      state.posts = [...state.posts, action.payload];

      state.currentProfilePosts = state.currentProfilePosts && [action.payload, ...state.currentProfilePosts];
    },
    removePostInState: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.currentProfilePosts =
        state.currentProfilePosts && state.currentProfilePosts.filter((post) => post.id !== action.payload);
    },
    updatePostInState: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts.map((post) => (post.id === action.payload.id ? action.payload : post));
      state.currentProfilePosts =
        state.currentProfilePosts &&
        state.currentProfilePosts.map((post) => (post.id === action.payload.id ? action.payload : post));
    },
  },
});

export const { postsLoadingSuccess, defineCurrentProfilePosts, addPostInState, updatePostInState, removePostInState } =
  postsStateSlice.actions;

export const postsState = postsStateSlice.reducer;
