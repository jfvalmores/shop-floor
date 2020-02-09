import React, { useState } from 'react';
import Floor from './Floor.js';
import Sidebar from './Sidebar.js';

function Shop(props) {
  const [shopSettings, setShopSettings] = useState({});

  const handleFormUpdate = (params) => {
    setShopSettings(params);
  }

  return (
    <Sidebar onFormUpdate={handleFormUpdate}>
      <Floor settings={shopSettings} />
    </Sidebar>
  )
}

export default Shop;