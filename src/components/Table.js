import React from 'react';
import ImageGetter from '../utils/ImageGetter.js';
import { DragPreviewImage, useDrag } from 'react-dnd';

function Table(props) {
  const { image, prefix } = props;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { ...props, type: 'OBJECT' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  })

  return (
    <>
      <DragPreviewImage connect={preview} src={getImage(image.data)} />
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}>
        <img style={{ width: '100%', padding: '10px 25px 0' }} src={getImage(image.data)} alt={image.label} />
        <div style={{ textAlign: 'center' }}>{prefix}</div>
      </div>
    </>
  );
}

const { getImage } = ImageGetter();

export default Table;