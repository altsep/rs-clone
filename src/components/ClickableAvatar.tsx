import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useParamsIdCurrentProfile from '../hooks/useParamsIdCurrentProfile';
import { IUser } from '../types/data';
import { getFirstLetter } from '../utils/common';

interface IClickableAvatarProps {
  user: IUser;
}

export default function ClickableAvatar({ user }: IClickableAvatarProps) {
  const navigate = useNavigate();
  const { idCurrentProfile } = useParamsIdCurrentProfile();

  const handleClickAvatar = (id: number): void => {
    if (idCurrentProfile !== id) {
      navigate(`/id/${id}`);
    }
  };

  return (
    <Avatar
      src={user.avatarURL}
      onClick={() => handleClickAvatar(user.id)}
      sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
    >
      {getFirstLetter(user.name)}
    </Avatar>
  );
}
