import { Container, Grid } from '@mui/material';
import FormFooter from '../components/FormFooter';
import FormHeader from '../components/FormHeader';
import RegistrationForm from '../components/RegistrationForm';

export default function Registration() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid
        container
        direction="column"
        sx={{
          p: '30px',
          width: '500px',
          maxWidth: 1,
          alignItems: 'center',
          borderRadius: 4,
          boxShadow: 3,
          // bgcolor: 'secondary.main',
        }}
      >
        <Grid item>
          <FormHeader>Sign Up</FormHeader>
        </Grid>
        <Grid item>
          <RegistrationForm />
        </Grid>
        <Grid item>
          <FormFooter linkTo="/" linkTitle="Sign In">
            Already have an account?
          </FormFooter>
        </Grid>
      </Grid>
    </Container>
  );
}
