import { Container, Grid, useTheme } from '@mui/material';
import LoginForm from '../components/LoginForm';
import FormHeader from '../components/FormHeader';
import FormFooter from '../components/FormFooter';

export default function Login() {
  const { breakpoints } = useTheme();
  const { up, down } = breakpoints;
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
          [down('sm')]: { p: '10px' },
          [up('sm')]: { width: '450px', boxShadow: 3, borderRadius: 3 },
          p: '20px',
          width: '400px',
          maxWidth: 1,
          alignItems: 'center',
          // bgcolor: 'secondary.main',
        }}
      >
        <FormHeader>Sign In</FormHeader>
        <LoginForm />
        <FormFooter linkTo="/registration" linkTitle="Sign Up">{`Don't have an account yet?`}</FormFooter>
      </Grid>
    </Container>
  );
}
