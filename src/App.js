import React from 'react'
import Shop from './components/Shop.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Shop />
    </ThemeProvider>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#00e676',
    },
  },
  typography: {
    fontSize: 11
  }
});

export default App;