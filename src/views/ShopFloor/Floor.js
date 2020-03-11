import React from 'react';
import {
  Table,
  FloorTile,
} from './'

function Floor(props) {
  const { mParams, mTable } = props;
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
    const key = generateKey(x, y);
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
        {mTable.map(item => renderPiece(x, y, item))}
      </FloorTile>
    );
  }

  const renderPiece = (x, y, item) => {
    const isObjectHere = x === item.x && y === item.y;
    const sKey = generateKey(x, y);

    return isObjectHere ?
      <Table
        key={sKey}
        mKeys={item}
        formState={props.formState}/> : null;
  }

  const generateKey = (x, y) => {
    return `x-${x}-y-${y}`;
  }

  return (
    <div style={{
      display: 'inline-block',
      borderTop: bView ? 'none' : '.5px solid lightskyblue',
      borderLeft: bView ? 'none' : '.5px solid lightskyblue',
      flexWrap: 'wrap',
      backgroundColor: mParams.fbackground,
    }}>
      {getFloorTiles(mParams.fwidth, mParams.fheight)}
    </div>
  );
}

const breakWrap = {
  flexBasis: '100%',
  height: 0,
};

export default Floor;