import React from 'react';
import Tile from './Tile'
import { canMoveObject, moveObject } from '../utils/Logic';
import { useDrop } from 'react-dnd'

function FloorTile(props) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'OBJECT',
    canDrop: () => canMoveObject(props.x, props.y),
    drop: () => moveObject(props.x, props.y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: 80,
        height: 80,
        borderRight: '1px solid grey',
        borderBottom: '1px solid grey',
        borderCollapse: 'collapse',
        display: 'table-cell',
      }}>
      <Tile>
        {props.children}
      </Tile>
    </div>
  );
}

export default FloorTile;

