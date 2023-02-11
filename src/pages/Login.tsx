import { Container, Grid, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/Forms/LoginForm/LoginForm';
import FormHeader from '../components/Forms/FormElements/FormHeader';
import FormFooter from '../components/Forms/FormElements/FormFooter';

export default function Login() {
  const { t } = useTranslation();
  const { breakpoints } = useTheme();
  const { up } = breakpoints;
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10vh',
      }}
    >
      <Grid
        sx={{
          p: '10px',
          width: '400px',
          maxWidth: 1,
          alignItems: 'center',
          [up('sm')]: { p: '20px', width: '450px', boxShadow: 3, borderRadius: 3, bgcolor: 'secondary.main' },
        }}
      >
        <FormHeader>{t('login.title')}</FormHeader>
        <LoginForm />
        <FormFooter linkTo="/registration" linkTitle={t('login.signUp')}>
          {t('login.footerText')}
        </FormFooter>
      </Grid>
    </Container>
  );
}
