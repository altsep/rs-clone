import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useSWRMutation from 'swr/mutation';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import i18next from 'i18next';
import moment from 'moment';
import 'moment/dist/locale/ru';
import 'moment/dist/locale/es';
import {
  Button,
  InputAdornment,
  IconButton,
  Box,
  TextField,
  TextFieldProps,
  Grid,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PublicIcon from '@mui/icons-material/Public';
import { useTranslation } from 'react-i18next';
import { IFormValues } from '../../../types/formValues';
import FormInput from '../FormElements/FormInput';
import { ApiPath, API_BASE_URL, locales } from '../../../constants';
import { registerUser } from '../../../api/usersApi';
import { setToken } from '../../../utils/common';
import { ILogin } from '../../../types/data';
import { useAppDispatch } from '../../../hooks/redux';
import { setAuth, setAuthError } from '../../../store/reducers/authSlice';
import { setUser } from '../../../store/reducers/usersState';

export default function RegistrationForm() {
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [birthdate, setBirthdate] = useState<string | null>('');
  const [registrationError, setRegistrationError] = useState<string>('');
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);

  const { t } = useTranslation();

  i18next.on('languageChanged', (lng: string): void => {
    moment.locale(lng);
  });

  const schema: yup.SchemaOf<IFormValues> = yup.object().shape({
    email: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,15}/),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null]),
    name: yup.string().required().min(5),
    country: yup.string().required().min(3),
    birthDate: yup
      .string()
      .required()
      .test(
        'birthDate',
        (date: string | undefined): boolean => moment().diff(moment(date, locales[moment.locale()]), 'years') >= 14
      ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      country: '',
      birthDate: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { trigger } = useSWRMutation(`${API_BASE_URL}${ApiPath.registration}`, registerUser);

  const login: SubmitHandler<IFormValues> = async (data: IFormValues): Promise<void> => {
    const { email, password, name, country, birthDate } = data;
    const res: Response | undefined = await trigger({
      email,
      password,
      name,
      country,
      birthDate: new Date(birthDate).toISOString(),
    });
    dispatch(setAuthError(false));
    if (res?.ok) {
      setRegistrationError('');
      setRegistrationSuccess(true);
      const resData = (await res?.json()) as ILogin;
      const { accessToken, user } = resData;
      setToken(accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(user));
    } else {
      setRegistrationSuccess(false);
      setRegistrationError(email);
    }
  };

  return (
    <Box
      component="form"
      sx={{ mb: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      onSubmit={handleSubmit(login)}
    >
      <Grid container rowSpacing={2} columnSpacing={2} sx={{ mb: '20px' }}>
        <Grid item xs={12} md={6}>
          <FormInput
            helperText={
              errors.email?.type === 'required'
                ? t('registration.errors.email.required')
                : t('registration.errors.email.validation')
            }
            type="text"
            control={control}
            name="email"
            label={`${t('registration.email')}*`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            helperText={
              errors.name?.type === 'required'
                ? t('registration.errors.name.required')
                : t('registration.errors.name.validation')
            }
            type="text"
            control={control}
            name="name"
            label={`${t('registration.name')}*`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SentimentSatisfiedAltIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            helperText={
              errors.password?.type === 'required'
                ? t('registration.errors.password.required')
                : t('registration.errors.password.validation')
            }
            type={passwordVisible ? 'text' : 'password'}
            control={control}
            name="password"
            label={`${t('registration.passwordCreate')}*`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(): void => setPasswordVisible((prev: boolean): boolean => !prev)}
                    edge="end"
                    size="small"
                  >
                    {passwordVisible ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            helperText={
              errors.passwordConfirm?.type === 'required'
                ? t('registration.errors.passwordConfirm.required')
                : t('registration.errors.passwordConfirm.validation')
            }
            type={passwordVisible ? 'text' : 'password'}
            control={control}
            name="passwordConfirm"
            label={`${t('registration.passwordConfirm')}*`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(): void => setPasswordVisible((prev: boolean): boolean => !prev)}
                    edge="end"
                    size="small"
                  >
                    {passwordVisible ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInput
            helperText={
              errors.country?.type === 'required'
                ? t('registration.errors.country.required')
                : t('registration.errors.country.validation')
            }
            type="text"
            control={control}
            name="country"
            label={`${t('registration.country')}*`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PublicIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              OpenPickerButtonProps={{
                size: 'small',
              }}
              value={birthdate}
              onChange={(val: string | null): void => setBirthdate(val)}
              renderInput={(props: TextFieldProps): JSX.Element => {
                return (
                  <TextField
                    type="date"
                    {...props}
                    {...register('birthDate')}
                    label={`${t('registration.birthDate')}*`}
                    size="medium"
                    variant="outlined"
                    error={!!errors.birthDate}
                    fullWidth
                    autoComplete="off"
                  />
                );
              }}
            />
            {errors.birthDate ? (
              <FormHelperText error>
                {errors.birthDate.type === 'required'
                  ? t('registration.errors.birthDate.required')
                  : t('registration.errors.birthDate.validation')}
              </FormHelperText>
            ) : null}
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Button variant="contained" fullWidth type="submit" sx={{ mb: '10px' }}>
        {t('registration.signUp')}
      </Button>
      {registrationError && (
        <FormHelperText error sx={{ fontSize: '14px', textAlign: 'center' }}>
          {t('registration.registrationErrors.email', { email: registrationError })}
        </FormHelperText>
      )}
      {registrationSuccess && (
        <FormHelperText sx={{ fontSize: '14px', textAlign: 'center', color: 'green' }}>
          {t('registration.registrationSuccess')}
        </FormHelperText>
      )}
    </Box>
  );
}
