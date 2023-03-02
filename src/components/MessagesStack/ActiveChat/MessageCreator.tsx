import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardActions, IconButton, TextField } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useAppSelector } from '../../../hooks/redux';

export default function MessageCreator() {
  const { t } = useTranslation();

  const [valueMessage, setValueMessage] = useState('');

  const { messagesWs, idAuthorizedUser, userOfActiveChat } = useAppSelector((state) => state.users);
  const { activeChat } = useAppSelector((state) => state.chats);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      handleClickSend();
    }
  };

  return (
    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <TextField
        label={t('messages.message')}
        value={valueMessage}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        size="small"
        sx={{ flexGrow: 1 }}
      />
      <IconButton onClick={handleClickSend} disabled={!valueMessage}>
        <SendOutlinedIcon />
      </IconButton>
    </CardActions>
  );
}
