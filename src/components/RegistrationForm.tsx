import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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
  Typography,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PublicIcon from '@mui/icons-material/Public';
import { useTranslation } from 'react-i18next';
import { IFormValues } from '../types/formValues';
import FormInput from './FormInput';
import { datesFormat } from '../constants';

export default function RegistrationForm() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [birthdate, setBirthdate] = useState<string | null>('');
  const [loginError, setLoginError] = useState<string>('');
  const [loginSuccess, setLoginSuccess] = useState<string>('');

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
        (date: string | undefined): boolean => moment().diff(moment(date, datesFormat[moment.locale()]), 'years') >= 14
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

  const registerUser = async (url: string, arg: Omit<IFormValues, 'passwordConfirm'>): Promise<Response> => {
    const res: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    });
    return res;
  };

  const onSubmit: SubmitHandler<IFormValues> = (data: IFormValues): void => {
    setLoginError('');
    setLoginSuccess('');
    const { email, password, name, country, birthDate } = data;
    registerUser('http://localhost:3000/api/users', {
      email,
      password,
      name,
      country,
      birthDate: new Date(birthDate).toISOString(),
    })
      .then((res: Response): void => {
        if (res.status === 500) {
          setLoginError('User with this email already exists');
        } else {
          setLoginSuccess('To verify your account, follow the link sent to your email');
        }
      })
      .catch((err: Error): Error => err);
  };

  return (
    <Box
      component="form"
      sx={{ mb: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      onSubmit={handleSubmit(onSubmit)}
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
      <Box sx={{ height: '1.5rem', mb: '5px' }}>
        {loginError && <Typography sx={{ color: 'red' }}>{loginError}</Typography>}
        {loginSuccess && <Typography sx={{ color: 'green' }}>{loginSuccess}</Typography>}
      </Box>
    </Box>
  );
}
