import React, { useState } from 'react';
import Floor from './Floor.js';
import Container from '@material-ui/core/Container';
import Sidebar from './Sidebar.js';

function Shop(props) {
  const [shopSettings, setShopSettings] = useState({});

  const handleFormUpdate = (params) => {
    setShopSettings(params);
  }

  return (
    <Sidebar onFormUpdate={handleFormUpdate}>
      <Container maxWidth="xl">
        <Floor settings={shopSettings} />
      </Container>
    </Sidebar>
  )
}

export default Shop;