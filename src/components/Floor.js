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
    <>
      {[...Array(y)].map((itemY, idxY) => {
        return (
          <div key={`y-${idxY}`}>
            {[...Array(x)].map((itemX, idxX) => {
              return (
                <Tile
                  key={`x-${idxX}`}
                  background={settings.background} />
              );
            })}
          </div>
        );
      })
      }
    </>
  )
}

export default Floor;