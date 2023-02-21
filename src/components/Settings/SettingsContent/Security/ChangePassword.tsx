import { Box, Button, Divider, FormHelperText, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { useState } from 'react';
import EditProfileInput from '../EditProfile/EditProfileInput';
import { IEditFormValues } from '../../../../types/formValues';
import { ApiPath, API_BASE_URL } from '../../../../constants';
import { changePassword } from '../../../../api/usersApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { ILogin } from '../../../../types/data';
import { setToken } from '../../../../utils/common';
import { setUser, updateUserInState } from '../../../../store/reducers/usersState';

export default function ChangePassword() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { idAuthorizedUser } = useAppSelector((state) => state.users);
  const [successChange, setSuccessChange] = useState<boolean>(false);
  const [errorChange, setErrorChange] = useState<boolean>(false);

  const schema = yup.object().shape({
    password: yup
      .string()
      .nullable()
      .transform((value: string, origin: string) => (origin === '' ? null : value))
      .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,15}/),
  });

  const defaultValues: Pick<IEditFormValues, 'password'> = {
    password: '',
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Pick<IEditFormValues, 'password'>>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { trigger } = useSWRMutation(`${API_BASE_URL}${ApiPath.password}`, changePassword);

  const updatePassword = async (data: Pick<IEditFormValues, 'password'>): Promise<void> => {
    const { password } = data;

    if (password) {
      setSuccessChange(false);
      setErrorChange(false);
      try {
        const res: Response | undefined = await trigger({ userId: idAuthorizedUser, password });

        if (res?.ok) {
          const resData = (await res.json()) as ILogin;
          const { accessToken, user } = resData;
          setToken(accessToken);
          setSuccessChange(true);
          dispatch(setUser(user));
          dispatch(updateUserInState(user));
        } else {
          throw new Error('Unsuccessful attempt to change password');
        }
      } catch {
        setErrorChange(true);
      }
    }
  };

  const resetPassword = (): void => {
    reset(defaultValues);
    setSuccessChange(false);
    setErrorChange(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(updatePassword)} sx={{ minWidth: '100%', mt: '20px' }}>
      <Grid container direction="column" sx={{ width: '50%', mb: '20px' }}>
        <Grid item sx={{ mb: '20px' }}>
          <EditProfileInput
            helperText={errors.password ? t('registration.errors.password.validation') : ''}
            name="password"
            control={control}
          >
            {t('settings.security.changePassword')}
          </EditProfileInput>
          {successChange && (
            <FormHelperText sx={{ color: 'green' }}>{t('settings.security.changeSuccess')}</FormHelperText>
          )}
          {errorChange && <FormHelperText error>{t('settings.security.changeError')}</FormHelperText>}
        </Grid>
        <Grid item sx={{ display: 'flex' }}>
          <Button sx={{ mr: '10px', color: 'text.secondary' }} onClick={resetPassword}>
            {t('settings.buttons.cancel')}
          </Button>
          <Button variant="contained" sx={{ borderRadius: '8px' }} type="submit">
            {t('settings.buttons.save')}
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
}
