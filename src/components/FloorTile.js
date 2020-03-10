import React from 'react';
import Tile from './Tile'
import { useDrop } from 'react-dnd'
import { makeStyles } from '@material-ui/core/styles';

function FloorTile(props) {
  const {
    x, y,
    performCanMoveObject,
    performMoveObject,
    onClick,
    children,
    formState,
  } = props;

  const classes = styles();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'OBJECT',
    canDrop: () => performCanMoveObject(x, y),
    drop: (item) => {
      performMoveObject(item, { x, y })
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const updateObject = () => {
    onClick(x, y);
  }

  return (
    <React.Fragment>
      {formState === 'VIEW' ?
        <div
          className={classes.tileContainer}>
          <Tile>
            {children}
          </Tile>
        </div>
        :
        <div
          ref={drop}
          onClick={updateObject}
          className={classes.tileContainer}>
          <Tile>
            {children}
            {isOver && !canDrop && <div className={classes.overlay} style={{ backgroundColor: 'red' }} />}
            {!isOver && canDrop && <div className={classes.overlay} style={{ backgroundColor: 'yellow' }} />}
            {isOver && canDrop && <div className={classes.overlay} style={{ backgroundColor: 'green' }} />}
          </Tile>
        </div>
      }
    </React.Fragment>
  );
}

const styles = makeStyles({
  tileContainer: {
    width: 80,
    height: 80,
    borderRight: '.5px solid lightskyblue',
    borderBottom: '.5px solid lightskyblue',
    borderCollapse: 'collapse',
    display: 'table-cell',
  },
  overlay: {
    width: 10,
    height: 10,
    position: 'absolute',
    backgroundColor: 'red',
  }
});

export default FloorTile;

