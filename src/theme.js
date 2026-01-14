import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// 創建自定義主題，使用 App.css 中定義的顏色
const GLOBAL_RADIUS = 4;

const theme = createTheme({
  palette: {
    primary: {
      main: '#E05D4A',
      light: '#E6ACA3',
      dark: '#963631',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#AB8866',
      light: '#D6C86F',
      dark: '#7A5C41',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FBF6F1',
      paper: '#FFFFFF',
    },
    success: {
      main: '#6B8E6B',
    },
  },
  shape: {
    borderRadius: GLOBAL_RADIUS,
  },
  custom: {
    login: {
      backgroundImageUrl: '/japanese-paper.jpg',
      backgroundSize: '200px 200px',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    title: {
      fontSize: { xs: '2rem', md: '5rem' },
      fontFamily: "'Kaisei Opti', serif",
      fontWeight: 300,
      lineHeight: 'tight',
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        'a': {
          color: theme.palette.primary.main,
        },
        'a:hover': {
          color: theme.palette.primary.dark,
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          fontWeight: 800,
          textTransform: 'none',
          letterSpacing: '0.1em',
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundColor: 'rgba(255, 255, 255, 0.80)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        }),
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0,0,0,0.40)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: alpha(theme.palette.primary.main, 0.12),
        }),
      },
    },
  },

});

export default theme;

