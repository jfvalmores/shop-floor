import React, { useState } from 'react';
import Floor from '../components/Floor';
import Sidebar from '../components/Sidebar';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import FloorForm from '../components/FloorForm';

function ShopFloor() {
  const [mSettings, setSettings] = useState(null);
  const [mObject, setObjectList] = useState([]);
  const [mMode, setMode] = useState('EDIT');

  const handleFormUpdate = (params) => {
    setSettings(params);
    removeExceedingObjects(Number(params.width) - 1, Number(params.height) - 1);
  }

  const removeExceedingObjects = (width, height) => {
    const list = mObject.slice();
    setObjectList(list.filter(item => item.x <= width && item.y <= height));
  }

  const updateObjects = (x, y) => {
    if (!mSettings.addRemoveObject) return;

    const list = mObject.slice();
    const index = checkIndex(x, y, list);

    if (index < 0) {
      list.push({
        x, y,
        image: mSettings.image,
        prefix: mSettings.prefix + ' ' + getNextPrefixCount(mSettings.prefix)
      });
    } else {
      list.splice(index, 1);
    }
    setObjectList(list);
  }

  const checkIndex = (x, y, list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i]['x'] === x && list[i]['y'] === y)
        return i;
    }

    return -1;
  }

  const getNextPrefixCount = (prefix = 'Default') => {
    let nextCount = 0;
    const list = mObject.slice();
    list.forEach(item => {
      if (prefix === getPrefix(item.prefix)) {
        const section = item.prefix.split(' ');
        const curr = parseInt(section[section.length - 1]);
        if (curr > nextCount) nextCount = curr;
      }
    });

    return nextCount += 1;
  }

  const getPrefix = (s) => {
    return s.replace(/[0-9]/g, '').trim();
  }

  const performMoveObject = (item, destination) => {
    console.log(item, destination);
    const list = mObject.slice();
    const index = list.findIndex(obj => obj.x === item.x && obj.y === item.y);
    list[index]['x'] = destination.x;
    list[index]['y'] = destination.y;
    setObjectList(list);
  }
  const performCanMoveObject = (x, y) => {
    if (!mSettings.arrangeObject) return false;
    if (mObject.findIndex(obj => obj.x === x && obj.y === y) > -1) return false;

    return true;
  }

  return (
    <Sidebar
      sidebarForm={
        <FloorForm onChange={handleFormUpdate} />
      }
    >
      <DndProvider backend={Backend}>
        {mSettings &&
          <Floor
            formState={mMode}
            mSettings={mSettings}
            mObject={mObject}
            updateObjects={updateObjects}
            performMoveObject={performMoveObject}
            performCanMoveObject={performCanMoveObject} />
        }
      </DndProvider>
    </Sidebar>
  )
}

export default ShopFloor;