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
          boxShadow: 3,
          borderRadius: 4,
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
