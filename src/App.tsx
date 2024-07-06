import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { CssBaseline } from '@mui/material/';
import { indigo, blue, green, red, amber } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: blue[500],
    },
    success: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
    warning: {
      main: amber[500],
    },
    background: {
      default: '#202020', // Dark background
      paper: '#252525', // Slightly lighter for paper elements
    },
    text: {
      primary: '#ffffff', // Primary text color
      secondary: '#b0b0b0', // Secondary text color
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '##1d1d1d',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </ThemeProvider>
  );
};

export default App;