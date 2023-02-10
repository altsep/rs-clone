import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../../constants';
import { TEditPost, TPostLikes, TPostsState } from '../../types/state';
import { IPost } from '../../types/data';

const initialState: TPostsState = {
  posts: [],
  currentProfilePosts: [],
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
    addLike: (state, action: PayloadAction<TPostLikes>) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.idPost
          ? {
              ...post,
              likedUserIds: post.likedUserIds
                ? [...post.likedUserIds, action.payload.idAuthorizedUser]
                : [action.payload.idAuthorizedUser],
              likes: post.likes + 1,
            }
          : post
      );
      state.currentProfilePosts = state.currentProfilePosts.map((post) =>
        post.id === action.payload.idPost
          ? {
              ...post,
              likedUserIds: post.likedUserIds
                ? [...post.likedUserIds, action.payload.idAuthorizedUser]
                : [action.payload.idAuthorizedUser],
              likes: post.likes + 1,
            }
          : post
      );
    },
    removeLike: (state, action: PayloadAction<TPostLikes>) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.idPost
          ? {
              ...post,
              likedUserIds: post.likedUserIds?.filter((likedUserId) => likedUserId !== action.payload.idAuthorizedUser),
              likes: post.likes - 1,
            }
          : post
      );
      state.currentProfilePosts = state.currentProfilePosts.map((post) =>
        post.id === action.payload.idPost
          ? {
              ...post,
              likedUserIds: post.likedUserIds?.filter((likedUserId) => likedUserId !== action.payload.idAuthorizedUser),
              likes: post.likes - 1,
            }
          : post
      );
    },
    addPostInState: (state, action: PayloadAction<IPost>) => {
      state.posts = [...state.posts, action.payload];
      state.currentProfilePosts = [action.payload, ...state.currentProfilePosts];
    },
    removePostInState: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.currentProfilePosts = state.currentProfilePosts.filter((post) => post.id !== action.payload);
    },
    editPost: (state, action: PayloadAction<TEditPost>) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id
          ? {
              ...post,
              description: action.payload.description,
            }
          : post
      );
      state.currentProfilePosts = state.currentProfilePosts.map((post) =>
        post.id === action.payload.id
          ? {
              ...post,
              description: action.payload.description,
            }
          : post
      );
    },
  },
});

export const {
  postsLoadingSuccess,
  defineCurrentProfilePosts,
  addLike,
  removeLike,
  addPostInState,
  editPost,
  removePostInState,
} = postsStateSlice.actions;

export const postsState = postsStateSlice.reducer;
