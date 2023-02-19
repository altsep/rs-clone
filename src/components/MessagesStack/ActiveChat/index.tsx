import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardActions, CardHeader, Divider, IconButton, List, TextField } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ClickableAvatar from '../../ClickableAvatar';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Message from './Message';
import { setUserOfActiveChat } from '../../../store/reducers/usersState';
import { setActiveChat } from '../../../store/reducers/chatsState';

export default function ActiveChat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [valueMessage, setValueMessage] = useState('');

  const endRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { messagesWs, idAuthorizedUser, authorizedUser, userOfActiveChat, usersOfExistingChats } = useAppSelector(
    (state) => state.users
  );
  const { activeChat, activeChatMessages, activeChatIndex } = useAppSelector((state) => state.chats);

  useEffect(() => {
    if (id) {
      const foundUser = usersOfExistingChats.find((user) => user && user.id === +id);

      if (foundUser) {
        dispatch(setUserOfActiveChat(foundUser));
        dispatch(setActiveChat(foundUser.id));
      } else {
        // LOOK_AGAIN
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

  const handleClickSend = (): void => {
    if (messagesWs && userOfActiveChat && activeChat) {
      const msg = {
        type: 'send',
        payload: { chatId: activeChat.id, userId: idAuthorizedUser, description: valueMessage },
      };
      messagesWs.send(JSON.stringify(msg));
      setValueMessage('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setValueMessage(e.target.value);
  };

  const handleKeyDownSend = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      handleClickSend();
    }
  };

  return (
    <Card
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'primary.main',
        borderRadius: 4,
        minHeight: '100%',
      }}
    >
      {userOfActiveChat && (
        <CardHeader
          avatar={<ClickableAvatar user={userOfActiveChat} />}
          title={userOfActiveChat.name}
          subheader="Active now"
        />
      )}

      <Divider />
      <List sx={{ flexGrow: 1, maxHeight: '63vh', overflowY: 'auto' }}>
        {activeChatMessages &&
          userOfActiveChat &&
          authorizedUser &&
          activeChatMessages.map((message) => (
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
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <TextField
          label="Type something here..."
          value={valueMessage}
          onKeyDown={handleKeyDownSend}
          onChange={handleChange}
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <IconButton onClick={handleClickSend} disabled={!valueMessage}>
          <SendOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
