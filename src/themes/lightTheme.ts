import { createTheme, Theme } from '@mui/material';
import { grey, orange, blueGrey } from '@mui/material/colors';

const lightTheme: Theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: grey[200],
    },
    background: {
      default: grey[50],
      paper: grey[50],
    },
  },
  typography: {
    subtitle2: {
      fontFamily: '"Lato", sans-serif',
      color: orange[500],
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: blueGrey[300],
            fontSize: '0.8rem',
            lineHeight: 2,
          },
          '& label.Mui-error': {
            color: blueGrey[300],
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: blueGrey.A400,
              padding: '5px',
              borderRadius: '10px',
            },
            '&.Mui-error fieldset': {
              borderColor: blueGrey.A400,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          textTransform: 'capitalize',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: grey[900],
        },
      },
    },
  },
});

export { lightTheme };
