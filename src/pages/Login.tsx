import { Container, Grid } from '@mui/material';
import LoginForm from '../components/LoginForm';
import FormHeader from '../components/FormHeader';
import FormFooter from '../components/FormFooter';

export default function Login() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid
        sx={{
          p: '20px',
          width: '400px',
          maxWidth: 1,
          alignItems: 'center',
          // bgcolor: 'secondary.main',
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <FormHeader>Sign In</FormHeader>
        <LoginForm />
        <FormFooter linkTo="/registration" linkTitle="Sign Up">{`Don't have an account yet?`}</FormFooter>
      </Grid>
    </Container>
  );
}
