import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { Button, InputAdornment, IconButton, Box, TextField, TextFieldProps, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PublicIcon from '@mui/icons-material/Public';
import { IFormValues } from '../types/formValues';
import FormInput from './FormInput';

export default function RegistrationForm() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [birthdate, setBirthdate] = useState<string | null>('');

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
        'Please choose a valid date of birth',
        (date: string | undefined): boolean => moment().diff(moment(date), 'years') >= 14
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

  const onSubmit = handleSubmit((data: IFormValues): void => console.log(data));

  return (
    <Box
      component="form"
      sx={{ mb: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        onSubmit().catch((err: Error): Error => err);
      }}
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
              inputFormat="DD/MM/YYYY"
              value={birthdate}
              onChange={(val: string | null): void => setBirthdate(val)}
              renderInput={(props: TextFieldProps): JSX.Element => (
                <TextField
                  type="date"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...props}
                  // eslint-disable-next-line react/jsx-props-no-spreading
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
      <Button variant="contained" fullWidth type="submit">
        Sign up
      </Button>
    </Box>
  );
}
