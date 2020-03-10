import React from 'react';
import ImageGetter from '../utils/ImageGetter.js';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';

function Table(props) {
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
        :
        <>
          <DragPreviewImage 
            connect={preview} 
            src={getImage(image.data)} />
          <div
            ref={drag}
            style={{
              opacity: isDragging ? 0.5 : 1,
            }}>
            <img 
              className={classes.img} 
              src={getImage(image.data)} 
              alt={image.label} />
            <div 
              className={classes.prefix}>
              {prefix}
            </div>
          </div>
        </>
      }
    </React.Fragment>
  );
}

const { getImage } = ImageGetter();
const style = makeStyles({
  img: {
    width: '100%', 
    padding: '10px 25px 0'
  },
  prefix: {
    textAlign: 'center'
  }
});

export default Table;