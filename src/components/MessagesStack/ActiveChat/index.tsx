import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardActions, CardHeader, Divider, IconButton, List, TextField } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ClickableAvatar from '../../ClickableAvatar';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Message from './Message';
import { setCurrentChat } from '../../../store/reducers/chatsState';
import { IUser } from '../../../types/data';

export default function ActiveChat() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const [valueMessage, setValueMessage] = useState('');

  const dispatch = useAppDispatch();

  const { messagesWs, idAuthorizedUser, users, authorizedUser } = useAppSelector((state) => state.users);
  const { chats, currentChatMessages } = useAppSelector((state) => state.chats);

  useEffect(() => {
    if (chats && id && users) {
      dispatch(setCurrentChat(+id));
      setCurrentUser(users.find((user) => id && user.id === +id) || null);
    }
  }, [dispatch, chats, id, users]);

  const handleClickSend = () => {
    if (messagesWs && currentUser) {
      const msg = {
        type: 'send',
        payload: { chatId: '63efa0ebded284b5f315b262', userId: idAuthorizedUser, description: valueMessage },
      };
      messagesWs.send(JSON.stringify(msg));
      setValueMessage('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueMessage(e.target.value);
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
      {currentUser && (
        <CardHeader avatar={<ClickableAvatar user={currentUser} />} title={currentUser.name} subheader="Active now" />
      )}

      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {currentChatMessages &&
          currentUser &&
          authorizedUser &&
          currentChatMessages.map((message) => (
            <Message
              key={message.id}
              user={message.userId === currentUser.id ? currentUser : authorizedUser}
              message={message}
              isLeft={message.userId === currentUser.id}
            />
          ))}
      </List>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <TextField
          label="Type something here..."
          value={valueMessage}
          onChange={handleChange}
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <IconButton onClick={handleClickSend}>
          <SendOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
