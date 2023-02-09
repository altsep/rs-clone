import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

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
      <Button variant="contained" fullWidth disabled={isDirty && !isValid} type="submit">
        {t('login.signIn')}
      </Button>
    </Box>
  );
}
