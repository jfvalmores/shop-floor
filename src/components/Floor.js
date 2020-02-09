import React, { useState, useEffect } from 'react';
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
      {[...Array(y)].map((itemY, idxY) => {
        return (
          <React.Fragment key={`y-${idxY}`}>
            <div style={{ flexBasis: '100%', height: 0 }} />
            {[...Array(x)].map((itemX, idxX) => {
              return (
                <Tile
                  key={`y-${idxY}-x-${idxX}`}
                  x={idxX}
                  y={idxY}
                  settings={settings} />
              );
            })}
          </React.Fragment>
        );
      })
      }
    </div>
  )
}

export default Floor;