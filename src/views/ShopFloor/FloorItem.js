import React from 'react';
import ImageGetter from '../../utils/ImageGetter.js';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';

function FloorItem(props) {
  const { image, prefix, formState } = props;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { ...props, type: 'OBJECT' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  });
  const classes = style();

  return (
    <React.Fragment>
      {formState === 'VIEW' ?
        <div style={{
          position: 'absolute',
          height: '100%',
          cursor: 'pointer'
        }}>
          <div>
            <img
              className={classes.img}
              src={getImage(image.data)}
              alt={image.label} />
            <div
              className={classes.prefix}>
              {prefix}
            </div>
          </div>
        </div>
        :
        <>
          <DragPreviewImage
            connect={preview}
            src={getImage(image.data)} />
          <div
            ref={drag}
            style={{
              position: 'absolute',
              height: '100%',
              cursor: 'move',
              opacity: isDragging ? 0.5 : 1,
            }}>
            <div>
              <img
                className={classes.img}
                src={getImage(image.data)}
                alt={image.label} />
              <div
                className={classes.prefix}>
                {prefix}
              </div>
            </div>
          </div>
        </>
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
    width: '100%',
    padding: '3px 20px 0'
  },
  prefix: {
    textAlign: 'center'
  }
});

export default FloorItem;