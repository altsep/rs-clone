import { Container, Grid, useTheme } from '@mui/material';
import FormFooter from '../components/FormFooter';
import FormHeader from '../components/FormHeader';
import RegistrationForm from '../components/RegistrationForm';

export default function Registration() {
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
