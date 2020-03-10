import React, { useState } from 'react'
import ShopFloorList from './views/ShopFloorList';
import Popup from './components/Popup';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const [popup, showPopup] = useState(false);
  const [message, setMessage] = useState('');

  const popupMessage = (m = '') => {
    setMessage(m);
    showPopup(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <ShopFloorList popupMessage={popupMessage} />
      <Popup
        open={popup}
        onClose={() => showPopup(false)}
        message={message}
      />
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