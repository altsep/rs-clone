import { Container, Grid, useTheme } from '@mui/material';
import LoginForm from '../components/LoginForm';
import FormHeader from '../components/FormHeader';
import FormFooter from '../components/FormFooter';

export default function Login() {
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
          // bgcolor: 'secondary.main',
          [up('sm')]: { p: '20px', width: '450px', boxShadow: 3, borderRadius: 3 },
        }}
      >
        <FormHeader>Sign In</FormHeader>
        <LoginForm />
        <FormFooter linkTo="/registration" linkTitle="Sign Up">{`Don't have an account yet?`}</FormFooter>
      </Grid>
    </Container>
  );
}
