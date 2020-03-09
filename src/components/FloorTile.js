import React from 'react';
import Tile from './Tile'
import { useDrop } from 'react-dnd'

function FloorTile(props) {
  const {
    x, y,
    performCanMoveObject,
    performMoveObject,
    onClick,
    children,
  } = props;

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
    <div
      ref={drop}
      onClick={updateObject}
      style={{
        width: 80,
        height: 80,
        borderRight: '1px solid grey',
        borderBottom: '1px solid grey',
        borderCollapse: 'collapse',
        display: 'table-cell',
      }}>
      <Tile>
        {children}
        {isOver && !canDrop && <div style={{ position: 'absolute', backgroundColor: 'red', width: 10, height: 10 }} />}
        {!isOver && canDrop && <div style={{ position: 'absolute', backgroundColor: 'yellow', width: 10, height: 10 }} />}
        {isOver && canDrop && <div style={{ position: 'absolute', backgroundColor: 'green', width: 10, height: 10 }} />}
      </Tile>
    </div>
  );
}

export default FloorTile;

