import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardHeader, Divider, List } from '@mui/material';

import ClickableAvatar from '../../ClickableAvatar';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Message from './Message';
import { setUserOfActiveChat } from '../../../store/reducers/usersState';
import { setActiveChat } from '../../../store/reducers/chatsState';
import MessageCreator from './MessageCreator';
import { INIT_MESSAGE } from '../../../constants';

export default function ActiveChat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const endRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { authorizedUser, userOfActiveChat, usersOfExistingChats } = useAppSelector((state) => state.users);
  const { activeChatMessages, activeChatIndex } = useAppSelector((state) => state.chats);

  useEffect(() => {
    if (id) {
      const foundUser = usersOfExistingChats.find((user) => user && user.id === +id);

      if (foundUser) {
        dispatch(setUserOfActiveChat(foundUser));
        dispatch(setActiveChat(foundUser.id));
      }
    }
  }, [dispatch, id, usersOfExistingChats, navigate]);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [activeChatIndex]);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChatMessages]);

  return (
    <Card
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'primary.main',
        borderRadius: { xs: 0, sm: 4 },
        boxShadow: { xs: 0, sm: 1 },
        minHeight: '100%',
      }}
    >
      {userOfActiveChat ? (
        <CardHeader avatar={<ClickableAvatar user={userOfActiveChat} />} title={userOfActiveChat.name} />
      ) : (
        <CardHeader sx={{ minHeight: '72px' }} />
      )}
      <Divider />
      <List sx={{ flexGrow: 1, maxHeight: '63vh', overflowY: 'auto' }}>
        {activeChatMessages &&
          userOfActiveChat &&
          authorizedUser &&
          activeChatMessages
            .filter((message) => message.description !== INIT_MESSAGE)
            .map((message) => (
              <Message
                key={message.id}
                user={message.userId === userOfActiveChat.id ? userOfActiveChat : authorizedUser}
                message={message}
                isLeft={message.userId === userOfActiveChat.id}
              />
            ))}
        <Box ref={endRef} />
      </List>
      <Divider />
      <MessageCreator />
    </Card>
  );
}
