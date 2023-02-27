import { useEffect } from 'react';
import { WS_BASE_URL } from '../constants';
import { addMessageSend, addMessageWatch } from '../store/reducers/chatsState';
import { isMessage } from '../types/predicates';
import { setMessagesWs, updateUserStatusInState } from '../store/reducers/usersState';
import { getActionString, getToken } from '../utils/common';
import { useAppDispatch, useAppSelector } from './redux';

export default function useMessagesWs() {
  const dispatch = useAppDispatch();
  const { idAuthorizedUser: userId, authorizedUser: userData } = useAppSelector((state) => state.users);

  useEffect(() => {
    let messagesWs: WebSocket | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    const modifyAuthorizedUserStatus = (isOnline: boolean) => {
      if (userData) {
        dispatch(updateUserStatusInState({ id: userId, isOnline }));
      }
    };

    const sendStatusMsg = (isOnline: boolean) => {
      const userStatusMsg = getActionString('userStatus', { userId, isOnline });
      messagesWs?.send(userStatusMsg);
      modifyAuthorizedUserStatus(isOnline);
    };

    const handleOpen = () => {
      const accessToken = getToken();
      const watchMsg = { type: 'watch', payload: { userId, accessToken } };

      messagesWs?.send(JSON.stringify(watchMsg));

      sendStatusMsg(true);
    };

    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'string') {
        const { type, payload } = JSON.parse(e.data) as { type: string; payload: unknown };

        if (type === 'system') {
          console.log('WS (messages): %s', payload);
        }

        if (type === 'watch') {
          if (isMessage(payload)) {
            dispatch(addMessageWatch(payload));
          }
        }

        if (type === 'send') {
          if (isMessage(payload)) {
            dispatch(addMessageSend(payload));
          }
        }
      }
    };

    const handleFocus = () => {
      clearTimeout(timeoutId);
      sendStatusMsg(true);
    };

    const handleBlur = () => {
      timeoutId = setTimeout(() => sendStatusMsg(false), 10000);
    };

    if (userId) {
      const wsUrl = new URL('messages', WS_BASE_URL);
      messagesWs = new WebSocket(wsUrl);

      messagesWs.addEventListener('open', handleOpen);
      messagesWs.addEventListener('message', handleMessage);

      dispatch(setMessagesWs(messagesWs));

      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);
      window.addEventListener('beforeunload', () => sendStatusMsg(false));
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [dispatch, userId]);
}
