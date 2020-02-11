import React from 'react';
import ImageGetter from '../utils/ImageGetter.js';
import { useDrag } from 'react-dnd';

function TileObject(props) {
  const {
    object,
  } = props;
  const addRemoveMode = props.settings.addRemoveObject;
  const arrangeMode = props.settings.arrangeObject;

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'Object' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  });

  return (
    <div
      ref={arrangeMode ? drag : null}
      style={{
        textAlign: 'center',
        padding: 5,
        cursor: addRemoveMode ? 'default' : 'move',
        opacity: isDragging ? 0.5 : 1,
      }}>
      {object &&
        <>
          <img
            style={{ width: 35 }}
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