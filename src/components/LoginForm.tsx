import { Box, Button, Grid, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TLoginValues } from '../types/formValues';
import FormInput from './FormInput';

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const schema: yup.SchemaOf<TLoginValues> = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit((data: TLoginValues): void => console.log(data));
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
      onSubmit={onSubmit}
    >
      <Grid container rowSpacing={2} sx={{ mb: '20px' }}>
        <Grid item xs={12}>
          <FormInput
            type="text"
            control={control}
            name="email"
            label="Email"
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
            control={control}
            name="password"
            label="Password"
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
      <Button variant="contained" fullWidth disabled={isDirty && !isValid} type="submit">
        Sign in
      </Button>
    </Box>
  );
}
