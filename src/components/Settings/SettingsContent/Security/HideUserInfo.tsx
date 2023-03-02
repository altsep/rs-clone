import { Box, Divider, FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useTranslation } from 'react-i18next';
import { ApiPath, API_BASE_URL } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { updateUser } from '../../../../api/usersApi';
import { setUser, updateUserInState } from '../../../../store/reducers/usersState';

export default function HideUserInfo() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { authorizedUser, idAuthorizedUser } = useAppSelector((state) => state.users);
  const [switchChecked, setSwitchChecked] = useState<boolean | undefined>(authorizedUser?.hidden);

  const { trigger } = useSWRMutation(`${API_BASE_URL}${ApiPath.users}/${idAuthorizedUser}`, updateUser);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const { checked } = event.target;

    setSwitchChecked(checked);

    const user = await trigger({ hidden: checked });

    if (user) {
      dispatch(setUser(user));
      dispatch(updateUserInState(user));
    }
  };
  return (
    <Box sx={{ minWidth: '100%' }}>
      <FormControlLabel
        sx={{ mb: '20px' }}
        label={t('settings.security.closeProfile')}
        control={<Switch checked={switchChecked} onChange={handleChange} />}
      />
      <Divider />
    </Box>
  );
}
