import { createTheme } from '@mui/material/styles';

// 創建自定義主題，使用 App.css 中定義的顏色
const theme = createTheme({
  palette: {
    primary: {
      main: '#963631',
      // main: '#E6ACA3', // App.css 的 --bs-primary
      light: '#B85C56',
      dark: '#6D2A25', 
      contrastText: '#FFFFFF', 
    },
    secondary: {
      // main: '#AB8866', // App.css 的 --bs-accent
      main: '#C1B14F',
      light: '#D6C86F',
      dark: '#9B8C3A',
      contrastText: '#FFFFFF',
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
  },
});

export default theme;

