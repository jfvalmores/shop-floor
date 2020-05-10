import React from 'react';
import { useDrop } from 'react-dnd'
import { makeStyles } from '@material-ui/core/styles';
import Overlay from './Overlay';

function FloorTile(props) {
  const {
    x, y,
    children,
    performMoveObject,
    performCanMoveObject,
  } = props;

  const classes = styles(props);

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

  return (
    <div
      ref={drop}
      className={classes.container}
      onClick={() => props.onClick(x, y)}>
      <div className={classes.overlay}>
        {children}
        {isOver && !canDrop && <Overlay color="red" />}
        {!isOver && canDrop && <Overlay color="white" />}
        {isOver && canDrop && <Overlay color="green" />}
      </div>
    </div>
  );
}

const styles = makeStyles({
  container: {
    width: 100,
    height: 100,
    borderRight: props => props.formState === 'VIEW' ?
      'none' : '.5px solid lightskyblue',
    borderBottom: props => props.formState === 'VIEW' ?
      'none' : '.5px solid lightskyblue',
    borderCollapse: 'collapse',
    display: 'table-cell',
  },
  overlay: {
    position: 'relative',
    width: '80%',
    height: '80%',
  }
});

export default FloorTile;

