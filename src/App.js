import React from 'react'
import Shop from './components/Shop.js';
import Container from '@material-ui/core/Container';
import Sidebar from './components/Sidebar.js';

function App() {
  return (
    <>
      <Sidebar>
        <Container maxWidth="xl">
          <Shop />
        </Container>
      </Sidebar>
    </>
  );
}

export default App;