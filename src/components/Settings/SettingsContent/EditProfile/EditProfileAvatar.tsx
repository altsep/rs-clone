import { Avatar, Badge, Box, IconButton } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useAppSelector } from '../../../../hooks/redux';
import { ApiPath, API_BASE_URL } from '../../../../constants';
import { sendImage } from '../../../../api/imagesApi';
import ImageAlert from '../../../ImageAlert/ImageAlert';
import useImage from '../../../../hooks/useImage';

export default function EditProfileAvatar() {
  const { idAuthorizedUser } = useAppSelector((state) => state.users);
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const avatarPicker = useRef<HTMLInputElement | null>(null);

  const { trigger } = useSWRMutation<Promise<Response>>(
    `${API_BASE_URL}${ApiPath.images}/user-avatar/${idAuthorizedUser}`,
    sendImage
  );

  const { data: avatar, mutate } = useImage(idAuthorizedUser, 'user-avatar');

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files) {
      const formData: FormData = new FormData();
      formData.append('user-avatar', e.target.files[0]);
      const res: Response | undefined = await trigger(formData);

      if (!res?.ok) {
        setAvatarError(true);
      }

      await mutate();
    }
  };

  const handleAvatarPicker = (): void => {
    if (avatarPicker.current) {
      avatarPicker.current.click();
    }
  };

  const handleCloseError = (): void => setAvatarError(false);

  return (
    <Box>
      <Badge
        badgeContent={
          <IconButton
            size="small"
            sx={{ backgroundColor: 'common.white', transform: 'translateY(-70%)' }}
            onClick={handleAvatarPicker}
          >
            <input
              hidden
              accept=".jpg, .png"
              type="file"
              name="user-avatar"
              ref={avatarPicker}
              onChange={handleChange}
            />
            <CloudDownloadOutlinedIcon fontSize="small" />
          </IconButton>
        }
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          src={avatar}
          sx={{ width: '70px', height: '70px', mb: '30px', border: 2, borderColor: 'common.white' }}
          alt="user avatar"
        />
      </Badge>
      <ImageAlert open={avatarError} handleCloseError={handleCloseError} />
    </Box>
  );
}
