import React, { useState } from 'react';
import { Card, CardActions, CardHeader, Divider, IconButton, List, TextField } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ClickableAvatar from '../../ClickableAvatar';
import { useAppSelector } from '../../../hooks/redux';
import Message from './Message';

export default function ActiveChat() {
  const [valueMessage, setValueMessage] = useState('');

  // FIX_ME Delete after adding real data
  const { authorizedUser, messagesWs, idAuthorizedUser } = useAppSelector((state) => state.users);

  if (!authorizedUser) {
    return <div>error</div>;
  }
  //

  const handleClickSend = () => {
    if (messagesWs) {
      const msg = {
        type: 'send',
        payload: { chatId: '63ee81ec605002ff787d7a4a', userId: idAuthorizedUser, description: valueMessage },
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
      <CardHeader
        avatar={<ClickableAvatar user={authorizedUser} />}
        title={authorizedUser.name}
        subheader="Active now"
      />
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        <Message message="123" isLeft />
        <Message message="321" isLeft={false} />
        <Message message="51" isLeft />
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
