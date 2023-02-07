import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { Button, InputAdornment, IconButton, Box, TextField, TextFieldProps, Grid, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PublicIcon from '@mui/icons-material/Public';
import { IFormValues } from '../types/formValues';
import FormInput from './FormInput';

export default function RegistrationForm() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [birthdate, setBirthdate] = useState<string | null>('');
  const [loginError, setLoginError] = useState<string>('');
  const [loginSuccess, setLoginSuccess] = useState<string>('');

  moment.locale('en');

  const schema: yup.SchemaOf<IFormValues> = yup.object().shape({
    email: yup.string().required('Email is required').email('yourmail@example.com'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,15}/,
        'Password must be 8-15 characters, include at least one lowercase letter, one uppercase letter, and a number'
      ),
    passwordConfirm: yup
      .string()
      .required('Password confirmation required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    name: yup.string().required('Name is required').min(5, `It's too short. Name must be at least 5 characters long`),
    country: yup
      .string()
      .required('Country is required')
      .min(3, `It's too short. Country must be at least 3 characters long`),
    birthDate: yup
      .string()
      .required('Birthdate is required')
      .test(
        'birthDate',
        'Invalid date. Age cannot be less than 14',
        (date: string | undefined): boolean => moment().diff(moment(date, 'MM-DD-YYYY'), 'years') >= 14
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
            type="text"
            control={control}
            name="email"
            label="Email*"
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
            type="text"
            control={control}
            name="name"
            label="Your Name*"
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
            type={passwordVisible ? 'text' : 'password'}
            control={control}
            name="password"
            label="Create Password*"
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
            type={passwordVisible ? 'text' : 'password'}
            control={control}
            name="passwordConfirm"
            label="Confirm Password*"
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
            type="text"
            control={control}
            name="country"
            label="Country*"
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
              renderInput={(props: TextFieldProps): JSX.Element => (
                <TextField
                  type="date"
                  {...props}
                  {...register('birthDate')}
                  label="Your Birthdate*"
                  size="medium"
                  variant="outlined"
                  error={!!errors.birthDate}
                  helperText={errors.birthDate?.message}
                  fullWidth
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Button variant="contained" fullWidth type="submit" sx={{ mb: '10px' }}>
        Sign up
      </Button>
      <Box sx={{ height: '1.5rem', mb: '5px' }}>
        {loginError && <Typography sx={{ color: 'red' }}>{loginError}</Typography>}
        {loginSuccess && <Typography sx={{ color: 'green' }}>{loginSuccess}</Typography>}
      </Box>
    </Box>
  );
}
