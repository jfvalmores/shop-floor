import React from 'react';

function Tile(props) {
  return (
    <div style={{
      position: 'relative',
    }}>
      {props.children}
    </div>
  );
}

export default Tile;