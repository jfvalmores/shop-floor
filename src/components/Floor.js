import React from 'react';
import Table from './Table'
import FloorTile from './FloorTile'

const boardStyle = {
  display: 'inline-block',
  borderTop: '1px solid grey',
  borderLeft: '1px solid grey',
  flexWrap: 'wrap',
}

const breakWrap = {
  flexBasis: '100%',
  height: 0,
};

function Floor(props) {
  const { mSettings, mObject } = props;
  console.log(mSettings);

  const getFloorTiles = (width = 5, height = 5) => {
    const floorTiles = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        floorTiles.push(renderFloorTile(x, y));
      }
      floorTiles.push(renderFloorTile(-1, y));
    }

    return floorTiles;
  }

  const renderFloorTile = (x, y) => {
    const key = `y-${y}-w-${x}`;
    if (x < 0) {
      return <div key={key} style={breakWrap} />;
    }

    return (
      <FloorTile
        key={key}
        x={x} y={y}
        onClick={props.updateObjects}
        performMoveObject={props.performMoveObject}
        performCanMoveObject={props.performCanMoveObject}
      >
        {
          mObject.map(item => renderPiece(x, y, item))
        }
      </FloorTile>
    );
  }

  const renderPiece = (x, y, item) => {
    const isObjectHere = x === item.x && y === item.y;
    return isObjectHere ?
      <Table
        key={`x-${x}-y-${y}`}
        x={x} y={y}
        image={item.image}
        prefix={item.prefix} /> : null;
  }

  return (
    <div style={{
      ...boardStyle,
      backgroundColor: mSettings.background,
    }}>
      {getFloorTiles(mSettings.width, mSettings.height)}
    </div>
  );
}

export default Floor;