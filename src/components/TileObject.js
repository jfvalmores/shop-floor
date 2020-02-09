import React from 'react';
import ImageGetter from '../utils/ImageGetter.js';

function TileObject(props) {
  const {
    object,
  } = props;

  return (
    <div style={{ textAlign: 'center', padding: 5 }}>
      {object &&
        <>
          <img
            style={{ width: 30 }}
            src={getImage(object.image.data)}
            alt="object" />
          <div>{object.prefix}</div>
        </>
      }
    </div>
  )
}

const { getImage } = ImageGetter();

export default TileObject;