import { Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../types/data';
import { getFirstLetter } from '../utils/common';

interface IClickableAvatarProps {
  user: IUser;
}

export default function ClickableAvatar({ user }: IClickableAvatarProps) {
  const navigate = useNavigate();
  const { id: idCurrentProfile } = useParams();

  const handleClickAvatar = (id: number): void => {
    if (Number(idCurrentProfile) !== id) {
      navigate(`/${id}`);
    }
  };

  return (
    <Avatar
      src={user && user.avatarURL && user.avatarURL}
      onClick={() => handleClickAvatar(user.id)}
      sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
    >
      {user && getFirstLetter(user.name)}
    </Avatar>
  );
}
