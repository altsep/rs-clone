import { Box, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import EditProfileInput from '../EditProfile/EditProfileInput';
import { IEditFormValues } from '../../../../types/formValues';

export default function ChangePassword() {
  const { t } = useTranslation();

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

  const updatePassword = (data: Pick<IEditFormValues, 'password'>) => console.log(data);
  const resetPassword = (): void => reset(defaultValues);

  return (
    <Box component="form" onSubmit={handleSubmit(updatePassword)} sx={{ minWidth: '100%' }}>
      <Grid container direction="column" sx={{ width: '50%' }}>
        <Grid item sx={{ mb: '30px' }}>
          <EditProfileInput
            helperText={errors.password ? t('registration.errors.password.validation') : ''}
            name="password"
            control={control}
          >
            {t('settings.editProfile.form.password')}
          </EditProfileInput>
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
    </Box>
  );
}
