import React from 'react';
import ImageGetter from '../../utils/ImageGetter.js';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';

function Table(props) {
  const { mKeys, formState } = props;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { mKeys, type: 'OBJECT' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  });
  const classes = style();

  const table = (
    <div>
      <img
        className={classes.img}
        src={getImage(mKeys.fimage_type.data)}
        alt={mKeys.fimage_type.label} />
      <div
        className={classes.prefix}>
        {mKeys.fname}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {formState === 'VIEW' ?
        <div
          className={classes.table}
          style={{
            cursor: 'pointer'
          }}>
          {table}
        </div>
        :
        <React.Fragment>
          <DragPreviewImage
            connect={preview}
            src={getImage(mKeys.fimage_type.data)} />
          <div
            ref={drag}
            className={classes.table}
            style={{
              cursor: 'move',
              opacity: isDragging ? 0.5 : 1,
            }}>
            {table}
          </div>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

const { getImage } = ImageGetter();
const style = makeStyles({
  piece: {
    cursor: 'pointer',
  },
  img: {
    maxWidth: '100%',
    maxHeight: 70,
    padding: '3px'
  },
  prefix: {
    textAlign: 'center'
  },
  table: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    textAlign: 'center'
  }
});

export default Table;