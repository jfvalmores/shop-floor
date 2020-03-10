import React from 'react';
import {
  FloorTile,
  FloorItem,
} from './'

function Floor(props) {
  const { mParams, mObject } = props;
  const bView = props.formState === 'VIEW';

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
        mParams={mParams}
        formState={props.formState}
        onClick={props.updateObjects}
        performMoveObject={props.performMoveObject}
        performCanMoveObject={props.performCanMoveObject}
      >
        {mObject.map(item => renderPiece(x, y, item))}
      </FloorTile>
    );
  }

  const renderPiece = (x, y, item) => {
    const isObjectHere = x === item.x && y === item.y;
    return isObjectHere ?
      <FloorItem
        key={`x-${x}-y-${y}`}
        x={x} y={y}
        image={item.image}
        prefix={item.prefix}
        formState={props.formState} /> : null;
  }

  return (
    <div style={{
      display: 'inline-block',
      borderTop: bView ? 'none' : '.5px solid lightskyblue',
      borderLeft: bView ? 'none' : '.5px solid lightskyblue',
      flexWrap: 'wrap',
      backgroundColor: mParams.background,
    }}>
      {getFloorTiles(mParams.width, mParams.height)}
    </div>
  );
}

const breakWrap = {
  flexBasis: '100%',
  height: 0,
};

export default Floor;