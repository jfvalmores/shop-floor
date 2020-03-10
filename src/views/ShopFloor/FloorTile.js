import React from 'react';
import { useDrop } from 'react-dnd'
import { makeStyles } from '@material-ui/core/styles';

function FloorTile(props) {
  const {
    x, y,
    onClick,
    mParams,
    children,
    formState,
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

  const updateObject = () => {
    onClick(x, y);
  }

  return (
    <React.Fragment>
      {formState === 'VIEW' ?
        <div
          onClick={updateObject}
          className={classes.tileContainer}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}>
            {children}
          </div>
        </div>
        :
        <div
          ref={drop}
          onClick={updateObject}
          className={classes.tileContainer}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}>
            {children}
            {isOver && !canDrop && <Overlay color="red" />}
            {!isOver && canDrop && <Overlay color="yellow" />}
            {isOver && canDrop && <Overlay color="green" />}
          </div>
        </div>
      }
    </React.Fragment>
  );
}

const Overlay = ({ color }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        height: '50%',
        width: '50%',
        borderRadius: '10%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  )
}

const styles = makeStyles({
  tileContainer: {
    width: 80,
    height: 80,
    borderRight: props => props.formState === 'VIEW' ?
      'none' : '.5px solid lightskyblue',
    borderBottom: props => props.formState === 'VIEW' ?
      'none' : '.5px solid lightskyblue',
    borderCollapse: 'collapse',
    display: 'table-cell',
  },
});

export default FloorTile;

