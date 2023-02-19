import { useEffect } from 'react';
import { commentsLoadingSuccess } from '../store/reducers/commentsState';
import { postsLoadingSuccess } from '../store/reducers/postsState';
import { usersLoadingSuccess } from '../store/reducers/usersState';
import { useAppDispatch } from './redux';
import useComments from './useComments';
import usePosts from './usePosts';
import useUsers from './useUsers';

export default function useData() {
  const dispatch = useAppDispatch();

  const { users, isLoadingUsers, isValidatingUsers } = useUsers();
  const { posts, isLoadingPosts, isValidatingPosts } = usePosts();
  const { comments, isLoadingComments, isValidatingComments } = useComments();

  useEffect(() => {
    if (users && !isLoadingUsers && !isValidatingUsers) {
      dispatch(usersLoadingSuccess(users));
    }
  }, [users, isLoadingUsers, isValidatingUsers, dispatch]);

  useEffect(() => {
    if (posts && !isLoadingPosts && !isValidatingPosts) {
      dispatch(postsLoadingSuccess(posts));
    }
  }, [posts, isLoadingPosts, isValidatingPosts, dispatch]);

  useEffect(() => {
    if (comments && !isLoadingComments && !isValidatingComments) {
      dispatch(commentsLoadingSuccess(comments));
    }
  }, [comments, isLoadingComments, isValidatingComments, dispatch]);
}
