import { useEffect } from 'react';
import { WS_BASE_URL } from '../constants';
import { setMessagesWs } from '../store/reducers/usersState';
import { getToken } from '../utils/common';
import { useAppDispatch, useAppSelector } from './redux';

export default function useMessagesWs() {
  const dispatch = useAppDispatch();
  const { idAuthorizedUser } = useAppSelector((state) => state.users);

  useEffect(() => {
    let messagesWs: WebSocket;

    const handleOpen = () => {
      console.log('WS (messages): %s', 'WS connection established.');

      const accessToken = getToken();
      const userId = idAuthorizedUser;
      const watchMsg = { type: 'watch', payload: { userId, accessToken } };

      messagesWs.send(JSON.stringify(watchMsg));
    };

    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'string') {
        const { type, payload } = JSON.parse(e.data) as { type: string; payload: unknown };

        if (type === 'system') {
          console.log('WS (messages): %s', payload);
        }
      }
    };

    if (idAuthorizedUser) {
      const wsUrl = new URL('messages', WS_BASE_URL);
      messagesWs = new WebSocket(wsUrl);

      messagesWs.addEventListener('open', handleOpen);

      messagesWs.addEventListener('message', handleMessage);

      dispatch(setMessagesWs(messagesWs));
    }

    return () => {
      if (messagesWs) {
        messagesWs.removeEventListener('open', handleOpen);
        messagesWs.removeEventListener('message', handleMessage);
      }
    };
  }, [dispatch, idAuthorizedUser]);
}
