import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RoutePath } from '../constants';
import {
  addMessageWatch,
  resetActiveChat,
  setLastMessagesInChats,
  setNumberOfUnreadMessagesInChats,
} from '../store/reducers/chatsState';
import { setUsersOfExistingChats } from '../store/reducers/usersState';
import { setLastMessages } from '../utils/common';
import { useAppDispatch, useAppSelector } from './redux';
import useUserChats from './useUserChats';

export default function useChats() {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const { idAuthorizedUser, users: usersInState } = useAppSelector((state) => state.users);
  const { chats, activeChat, numberOfUnreadMessagesInChats, lastMessagesInChats, firstMessageInChat } = useAppSelector(
    (state) => state.chats
  );
  const { userChats, mutate } = useUserChats(idAuthorizedUser);

  useEffect(() => {
    if (chats.length > 0 && idAuthorizedUser && usersInState.length > 0) {
      dispatch(setUsersOfExistingChats(chats));
    }
  }, [dispatch, chats, idAuthorizedUser, usersInState]);

  useEffect(() => {
    if (activeChat && `${location.pathname.split('/').slice(0, 2).join('/')}` !== `${RoutePath.messages}`) {
      dispatch(resetActiveChat());
    } else if (
      activeChat &&
      `${location.pathname.split('/').slice(0, 2).join('/')}` === `${RoutePath.messages}` &&
      !location.pathname.split('/')[2]
    ) {
      dispatch(resetActiveChat());
    }
  }, [dispatch, activeChat, location]);

  useEffect(() => {
    if (idAuthorizedUser && chats.length > 0) {
      window.addEventListener('beforeunload', () => {
        setLastMessages({ chats, numberOfUnreadMessagesInChats, lastMessagesInChats, idAuthorizedUser });
      });
    }
  }, [idAuthorizedUser, userChats, chats, numberOfUnreadMessagesInChats, lastMessagesInChats]);

  useEffect(() => {
    if (idAuthorizedUser) {
      dispatch(setLastMessagesInChats(idAuthorizedUser));
    }
  }, [dispatch, idAuthorizedUser]);

  useEffect(() => {
    if (lastMessagesInChats && chats) {
      dispatch(setNumberOfUnreadMessagesInChats(lastMessagesInChats));
    }
  }, [dispatch, lastMessagesInChats, chats]);

  useEffect(() => {
    if (firstMessageInChat) {
      const asyncFunc = async () => {
        await mutate();
        dispatch(addMessageWatch(firstMessageInChat));
      };
      asyncFunc().catch(console.error);
    }
  }, [dispatch, firstMessageInChat, mutate]);
}
