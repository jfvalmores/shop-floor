import React from 'react';
import {
  Table,
  FloorTile,
} from './'

const Floor = (props) => {
  const getFloorTiles = (width, height) => {
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
    if (x < 0) return <div key={key} style={breakWrap} />;

    return (
      <FloorTile
        key={key}
        x={x} y={y}
        mParams={props.mParams}
        formState={props.formState}
        onClick={props.updateObjects}
        performMoveObject={props.performMoveObject}
        performCanMoveObject={props.performCanMoveObject}
      >
        {props.mTableList.map(item => renderPiece(x, y, item))}
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
        formState={props.formState} /> : null;
  }

  const generateKey = (x, y) => {
    return `x-${x}-y-${y}`;
  }

  const border = (props.formState === 'VIEW') ? 'none' : '.5px solid lightskyblue';
  const { fbackground, fwidth, fheight } = props.mParams;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'auto'
    }}>
      <div>
        <div style={{
          ...tileContainer,
          borderTop: border,
          borderLeft: border,
          backgroundColor: fbackground,
        }}>
          {getFloorTiles(fwidth, fheight)}
        </div>
      </div>
    </div>
  );
}

const tileContainer = {
  display: 'inline-block',
  flexWrap: 'wrap',
};

const breakWrap = {
  flexBasis: '100%',
  height: 0,
};

export default Floor;