import { createTheme } from '@mui/material/styles';
import COLORS from './colors';
import TYPOGRAPHY from './typography';
import styles from './styles';

export const globalStyle = styles;

let theme = createTheme({
  typography: TYPOGRAPHY,
  palette: {
    mode: 'light',
    primary: {
      main: COLORS.primary.main,
      light: COLORS.primary.light,
      mainGradient: COLORS.primary.mainGradient,
    },
    secondary: {
      main: COLORS.secondary.main,
      light: COLORS.secondary.light,
    },
    progress: COLORS.progress,
    success: {
      main: COLORS.success.main,
      light: COLORS.success.light,
    },
    warning: {
      main: COLORS.warning.main,
      light: COLORS.warning.light,
    },
    // error: {
    //   main: COLORS.error.main,
    //   light: COLORS.error.main,
    // },
    white: { main: '#fff' },
    background: {
      default: '#fafafa',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
  },
  divider: '#BDBDBD',
});

// console.log(theme, 'theme');
theme = createTheme(theme, {
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        contained: {
          fontSize: theme.spacing(2),
          borderRadius: '5px',
          letterSpacing: '0.5px',
          padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
          fontWeight: 500,
          marginBottom: '1rem',
          backgroundColor: '#bb3d40',
          '&:hover': {
            backgroundColor: '#1e9558',
          },
        },
      },
    },
    PrivateNotchedOutline: {
      styleOverrides: {
        root: {
          borderWidth: '2px',
          borderColor: COLORS.lightBlack,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: COLORS.lightBlack,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&.Mui-disabled:before': {
            borderBottomStyle: 'none',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: COLORS.lightBlack,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: 0,
          backgroundColor: '#2b81be',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${theme.palette.grey['200']}`,
          '& .MuiButton-root': {
            marginBottom: 0,
            padding: `${theme.spacing(0.5)} ${theme.spacing(0.75)}`,
            marginRight: '4px',
            [theme.breakpoints.up('md')]: {
              padding: `${theme.spacing(0.5)} ${theme.spacing(4)}`,
              fontSize: '0.875rem',
            },
          },
        },
        head: {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.getContrastText(theme.palette.primary.light),
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
          marginBottom: '1rem',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          padding: 0,
          button: {
            padding: 0,
            margin: 0,
            justifyContent: 'flex-start',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '.MuiListItemButton-root': {
            borderRadius: '25px 25px 0 25px',
            margin: '0 12px',
            '&.active': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.common.white,
              '.MuiListItemIcon-root': {
                color: theme.palette.common.white,
              },
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          '.MuiAutocomplete-option': {
            borderBottom: '1px solid',
            borderColor: theme.palette.grey[100],
            '&:last-child': {
              borderBottom: 'none',
            },
          },
        },
      },
    },
    MuiGrid: {
      defaultProps: {
        maxWidth: 'xl',
      },
      styleOverrides: {
        container: {
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
    MuiAvatar: {
      defaultProps: {
        imgProps: { crossOrigin: 'anonymous' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          whiteSpace: 'break-spaces',
        },
      },
    },
  },
});

export default theme;
