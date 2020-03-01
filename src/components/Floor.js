import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Tile from './Tile.js';

function Floor(props) {
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);
  const {
    settings,
  } = props;

  useEffect(() => {
    console.log(settings);
    if (settings.width && settings.height) {
      setX(parseInt(settings.width));
      setY(parseInt(settings.height));
    }
  }, [settings]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <DndProvider backend={Backend}>
        {[...Array(y)].map((itemY, idxY) => {
          return (
            <React.Fragment key={`y-${idxY}`}>
              <div style={{ flexBasis: '100%', height: 0 }} />
              {[...Array(x)].map((itemX, idxX) => {
                return (
                  <Tile
                    x={idxX}
                    y={idxY}
                    settings={settings}
                    key={`y-${idxY}-x-${idxX}`} />
                );
              })}
            </React.Fragment>
          );
        })
        }
      </DndProvider>
    </div>
  )
}

export default Floor;