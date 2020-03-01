import React, { useState } from 'react';
import Floor from './Floor';
import Sidebar from '../components/Sidebar';

function ShopFloor() {
  const [shopSettings, setShopSettings] = useState(null);

  const handleFormUpdate = (params) => {
    setShopSettings(params);
  }

  return (
    <Sidebar onFormUpdate={handleFormUpdate}>
      <Floor
        settings={shopSettings}
        piecePosition={[{ x: 2, y: 2 }]} />
    </Sidebar>
  )
}

export default ShopFloor;