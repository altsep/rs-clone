import { Container, Grid, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FormFooter from '../components/Forms/FormElements/FormFooter';
import FormHeader from '../components/Forms/FormElements/FormHeader';
import RegistrationForm from '../components/Forms/RegistrationForm/RegistrationForm';

export default function Registration() {
  const { t } = useTranslation();
  const { breakpoints } = useTheme();
  const { up } = breakpoints;
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5vh',
      }}
    >
      <Grid
        container
        direction="column"
        sx={{
          p: '10px',
          width: '500px',
          maxWidth: 1,
          alignItems: 'center',
          [up('sm')]: { p: '30px', width: '550px', boxShadow: 3, borderRadius: 3, bgcolor: 'secondary.main' },
          [up('md')]: { width: '650px' },
        }}
      >
        <Grid item>
          <FormHeader>{t('registration.title')}</FormHeader>
        </Grid>
        <Grid item>
          <RegistrationForm />
        </Grid>
        <Grid item>
          <FormFooter linkTo="/" linkTitle={t('registration.signIn')}>
            {t('registration.footerText')}
          </FormFooter>
        </Grid>
      </Grid>
    </Container>
  );
}
