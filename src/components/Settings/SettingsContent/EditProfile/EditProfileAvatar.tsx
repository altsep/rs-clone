import { Avatar, Badge, IconButton } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { useAppSelector } from '../../../../hooks/redux';

export default function EditProfileAvatar() {
  const user = useAppSelector((state) => state.users.authorizedUser);
  return (
    <Badge
      badgeContent={
        <IconButton size="small" sx={{ backgroundColor: 'common.white', transform: 'translateY(-70%)' }}>
          <CloudDownloadOutlinedIcon fontSize="small" />
        </IconButton>
      }
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Avatar
        sx={{ width: '70px', height: '70px', mb: '30px', border: 2, borderColor: 'common.white' }}
        alt="user avatar"
        src={user?.avatarURL}
      />
    </Badge>
  );
}
