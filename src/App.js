import React from 'react'
import ShopFloorList from './views/ShopFloorList';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ShopFloorList />
    </ThemeProvider>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#005BEA',
      selected: '#0091E7',
      light: '#E7FAFE'
    },
    secondary: {
      main: '#1DB954',
      selected: '#4ac776',
      contrastText: '#fff'
    },
  },
  typography: {
    fontSize: 11
  }
});

export default App;