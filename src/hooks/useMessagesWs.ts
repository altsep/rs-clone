import { useEffect } from 'react';
import { WS_BASE_URL } from '../constants';
import { addMessageSend, addMessageWatch } from '../store/reducers/chatsState';
import { setMessagesWs } from '../store/reducers/usersState';
import { isMessage } from '../types/predicates';
import { getActionString, getToken } from '../utils/common';
import { useAppDispatch, useAppSelector } from './redux';

export default function useMessagesWs() {
  const dispatch = useAppDispatch();
  const { idAuthorizedUser: userId } = useAppSelector((state) => state.users);

  useEffect(() => {
    let messagesWs: WebSocket | undefined;

    const handleOpen = () => {
      console.log('WS (messages): %s', 'WS connection established.');

      const accessToken = getToken();
      const watchMsg = { type: 'watch', payload: { userId, accessToken } };

      messagesWs?.send(JSON.stringify(watchMsg));

      const isOnline = true;
      const userStatusMsg = getActionString('userStatus', { userId, isOnline });
      messagesWs?.send(userStatusMsg);
    };

    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'string') {
        const { type, payload } = JSON.parse(e.data) as { type: string; payload: unknown };

        if (type === 'system') {
          console.log('WS (messages): %s', payload);
        }

        if (type === 'watch') {
          console.log('WS (messages): %s', 'Message received.');
          console.log(payload);

          if (isMessage(payload)) {
            dispatch(addMessageWatch(payload));
          }
        }

        if (type === 'send') {
          console.log(payload);
          if (isMessage(payload)) {
            dispatch(addMessageSend(payload));
          }
        }
      }
    };

    if (userId) {
      const wsUrl = new URL('messages', WS_BASE_URL);
      messagesWs = new WebSocket(wsUrl);

      messagesWs.addEventListener('open', handleOpen);
      messagesWs.addEventListener('message', handleMessage);

      dispatch(setMessagesWs(messagesWs));

      window.addEventListener('beforeunload', () => {
        const isOnline = false;
        const msg = getActionString('userStatus', { userId, isOnline });
        messagesWs?.send(msg);
      });
    }

    return () => {
      messagesWs?.close();
    };
  }, [dispatch, userId]);
}
