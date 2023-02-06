import { Container, Grid, useTheme } from '@mui/material';
import FormFooter from '../components/FormFooter';
import FormHeader from '../components/FormHeader';
import RegistrationForm from '../components/RegistrationForm';

export default function Registration() {
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
        container
        direction="column"
        sx={{
          [down('sm')]: { p: '10px' },
          [up('sm')]: { width: '550px', boxShadow: 3, borderRadius: 3 },
          [up('md')]: { width: '650px' },
          p: '30px',
          width: '500px',
          maxWidth: 1,
          alignItems: 'center',
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
