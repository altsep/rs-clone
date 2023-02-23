import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TLoginValues } from '../../../types/formValues';
import FormInput from '../FormElements/FormInput';
import { ApiPath, API_BASE_URL } from '../../../constants';
import { loginUser } from '../../../api/usersApi';
import { ILogin } from '../../../types/data';
import { setAuth, setAuthError, setConfirmError } from '../../../store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getActionString, setToken } from '../../../utils/common';
import { setUser } from '../../../store/reducers/usersState';
import useAvatar from '../../../hooks/useImage';

export default function LoginForm() {
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const authError = useAppSelector((state) => state.auth.authError);
  const confirmError = useAppSelector((state) => state.auth.confirmError);
  const { messagesWs } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const schema: yup.SchemaOf<TLoginValues> = yup.object().shape({
    email: yup.string().required('login.errors.email'),
    password: yup.string().required('login.errors.password'),
  });

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<TLoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const sendOnlineStatus = (id: number): void => {
    const isOnline = true;
    const userStatusMsg = getActionString('userStatus', { userId: id, isOnline });
    messagesWs?.send(userStatusMsg);
  };
  const { trigger } = useSWRMutation(`${API_BASE_URL}${ApiPath.login}`, loginUser);

  const onSubmit = async (data: TLoginValues): Promise<void> => {
    dispatch(setAuthError(false));
    dispatch(setConfirmError(false));
    const res: Response | undefined = await trigger(data);
    if (res?.ok) {
      setLoginError(false);
      const resData = (await res?.json()) as ILogin;
      const { accessToken, user } = resData;
      const { id, isActivated } = user;
      if (isActivated) {
        dispatch(setConfirmError(false));
        setToken(accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(user));
        navigate(user.alias ? `/${user.alias}` : `/id${id}`);
        if (messagesWs) {
          sendOnlineStatus(id);
        }
      } else {
        dispatch(setConfirmError(true));
      }
    } else {
      setLoginError(true);
    }
  };

  const onClick = (): void => setPasswordVisible((prev: boolean): boolean => !prev);

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: '30px',
        alignItems: 'center',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container rowSpacing={2} sx={{ mb: '20px' }}>
        <Grid item xs={12}>
          <FormInput
            helperText={t('login.errors.email')}
            type="text"
            control={control}
            name="email"
            label={t('login.email')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            type={passwordVisible ? 'text' : 'password'}
            helperText={t('login.errors.password')}
            control={control}
            name="password"
            label={t('login.password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onClick} edge="end" size="small">
                    {passwordVisible ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Button variant="contained" fullWidth disabled={isDirty && !isValid} type="submit" sx={{ mb: '10px' }}>
        {t('login.signIn')}
      </Button>
      {loginError && (
        <FormHelperText error sx={{ fontSize: '14px', textAlign: 'center' }}>
          {t('login.loginError')}
        </FormHelperText>
      )}
      {authError && (
        <FormHelperText error sx={{ fontSize: '14px', textAlign: 'center' }}>
          {t('login.authError')}
        </FormHelperText>
      )}
      {confirmError && (
        <FormHelperText error sx={{ fontSize: '14px', textAlign: 'center' }}>
          {t('login.confirmError')}
        </FormHelperText>
      )}
    </Box>
  );
}
