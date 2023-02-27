import { grey, blueGrey, lightBlue } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material';

const darkTheme: Theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[600],
    },
    secondary: {
      main: blueGrey[800],
      contrastText: grey[50],
    },
    background: {
      default: blueGrey[900],
      paper: blueGrey[900],
    },
    text: {
      primary: blueGrey[50],
      secondary: grey.A400,
    },
  },
  typography: {
    subtitle2: {
      fontFamily: '"Lato", sans-serif',
      color: lightBlue[600],
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: blueGrey[100],
            fontSize: '0.8rem',
            lineHeight: 2,
          },
          '& label.Mui-error': {
            color: blueGrey[100],
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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: blueGrey[100],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          textTransform: 'capitalize',
          '&.Mui-disabled': {
            color: '#757575',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: grey[50],
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: grey[600],
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderColor: grey[600],
        },
      },
    },
  },
});

export { darkTheme };
