import React, { useState, useEffect } from 'react';
import Floor from '../components/Floor';
import Sidebar from '../components/Sidebar';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { listenChanges } from '../utils/Logic';

function ShopFloor() {
  const [shopSettings, setShopSettings] = useState(null);
  const [objectPos, setObjectPos] = useState([{ x: 0, y: 0 }]);

  useEffect(() => listenChanges(newPos => setObjectPos(newPos)));

  const handleFormUpdate = (params) => {
    setShopSettings(params);
  }

  return (
    <Sidebar onFormUpdate={handleFormUpdate}>
      <DndProvider backend={Backend}>
        {shopSettings &&
          <Floor
            settings={shopSettings}
            piecePosition={objectPos} />
        }
      </DndProvider>
    </Sidebar>
  )
}

export default ShopFloor;