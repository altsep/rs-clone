import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { IUser } from '../../types/data';
import { getFirstLetter } from '../../utils/common';

interface IClickableAvatarProps {
  user: IUser;
  width?: string;
  height?: string;
}

export default function ClickableAvatar({ user, width, height }: IClickableAvatarProps) {
  const navigate = useNavigate();

  const { idCurrentProfile } = useAppSelector((state) => state.users);

  const handleClickAvatar = (id: number): void => {
    if (idCurrentProfile !== id) {
      if (user?.alias) {
        navigate(`/${user.alias}`);
      } else {
        navigate(`/id${id}`);
      }
    }
  };
  if (width === '20px' && height === '20px') {
    return (
      <Avatar
        src={user.avatarURL}
        onClick={() => handleClickAvatar(user.id)}
        sx={{ textTransform: 'capitalize', cursor: 'pointer', width, height, fontSize: 'small' }}
      >
        {getFirstLetter(user.name)}
      </Avatar>
    );
  }

  return (
    <Avatar
      src={user.avatarURL}
      onClick={() => handleClickAvatar(user.id)}
      sx={{ textTransform: 'capitalize', cursor: 'pointer', width, height }}
    >
      {getFirstLetter(user.name)}
    </Avatar>
  );
}

ClickableAvatar.defaultProps = {
  width: '40px',
  height: '40px',
};
