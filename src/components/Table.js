import React from 'react';
import ImageGetter from '../utils/ImageGetter.js';
import { useDrag } from 'react-dnd';

function Table(props) {
  const { image, prefix } = props;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'OBJECT' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  })
  console.log(props);

  return (
    <>
      {/* <DragPreviewImage connect={preview} src={knightImage} /> */}
      <div ref={drag}>
        <img style={{ width: '100%', padding: '10px 25px 0' }} src={getImage(image.data)} alt={image.label} />
        <div style={{ textAlign: 'center' }}>{prefix}</div>
      </div>
    </>
  );
}

const { getImage } = ImageGetter();

export default Table;