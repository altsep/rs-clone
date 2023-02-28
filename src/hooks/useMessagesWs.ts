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
    let pingIntervalId: NodeJS.Timeout | undefined;
    let reconnectIntervalId: NodeJS.Timeout | undefined;
    const wsUrl = new URL('messages', WS_BASE_URL);

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
      const watchMsg = getActionString('watch', { userId, accessToken });

      messagesWs?.send(watchMsg);

      sendStatusMsg(true);

      pingIntervalId = setInterval(() => {
        if (messagesWs?.readyState !== 1) {
          clearInterval(pingIntervalId);
          return;
        }

        const pingMsg = getActionString('ping', 'ping');

        messagesWs.send(pingMsg);
      }, 5000);
    };

    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'string') {
        const { type, payload } = JSON.parse(e.data) as { type: string; payload: unknown };

        if (type === 'error') {
          console.error('WS (messages): %s', payload);
        }

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

    const reconnect = () => {
      const handleReconnect = () => {
        if (messagesWs?.readyState === 1) {
          clearInterval(reconnectIntervalId);
          reconnectIntervalId = undefined;
          return;
        }

        if (messagesWs?.readyState !== 0 && userId) {
          messagesWs = new WebSocket(wsUrl);
          messagesWs.addEventListener('open', handleOpen);
          messagesWs.addEventListener('message', handleMessage);
          messagesWs.addEventListener('close', reconnect);
          messagesWs.addEventListener('error', reconnect);

          dispatch(setMessagesWs(messagesWs));
        }
      };

      if (reconnectIntervalId == null) {
        reconnectIntervalId = setInterval(handleReconnect, 10000);
      }
    };

    const handleFocus = () => {
      clearTimeout(timeoutId);
      sendStatusMsg(true);
    };

    const handleBlur = () => {
      timeoutId = setTimeout(() => sendStatusMsg(false), 10000);
    };

    const handleUnload = () => {
      sendStatusMsg(false);
      messagesWs?.close();
    };

    const cleanup = () => {
      clearInterval(pingIntervalId);
      clearInterval(reconnectIntervalId);
      clearTimeout(timeoutId);

      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('beforeunload', handleUnload);
    };

    if (userId) {
      messagesWs = new WebSocket(wsUrl);
      messagesWs.addEventListener('open', handleOpen);
      messagesWs.addEventListener('message', handleMessage);
      messagesWs.addEventListener('close', reconnect);
      messagesWs.addEventListener('error', reconnect);

      dispatch(setMessagesWs(messagesWs));

      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);
      window.addEventListener('beforeunload', handleUnload);
    }

    return cleanup;
  }, [dispatch, userId]);
}
