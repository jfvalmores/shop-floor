import React from 'react';
import ImageGetter from '../utils/ImageGetter';

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
  const { settings, piecePosition } = props;
  if (settings === null) return null;
  console.log(settings);

  function getFloorTiles(width = 5, height = 5) {
    const floorTiles = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        floorTiles.push(renderFloorTile(x, y));
      }
      floorTiles.push(renderFloorTile(-1, y));
    }

    return floorTiles;
  }

  function renderFloorTile(x, y) {
    const key = `y-${y}-w-${x}`;
    if (x < 0) {
      return <div key={key} style={breakWrap} />;
    }

    return (
      <FloorTile
        key={key}
        x={x} y={y}>
        {renderPiece(x, y)}
      </FloorTile>
    );
  }

  function renderPiece(x, y) {
    const isObjectHere = x === piecePosition[0].x && y === piecePosition[0].y;
    return isObjectHere ?
      <Table
        image={settings.image}
        prefix={settings.prefix} /> : null;
  }

  return (
    <div style={{
      ...boardStyle,
      backgroundColor: settings.background,
    }}>
      {getFloorTiles(settings.width, settings.height)}
    </div>
  );
}

function Table(props) {
  const { image, prefix } = props;
  console.log(props);

  return (
    <div>
      <img style={{ width: '100%', padding: '10px 25px 0' }} src={getImage(image.data)} alt={image.label} />
      <div style={{ textAlign: 'center' }}>{prefix}</div>
    </div>
  );
}

function FloorTile(props) {
  return (
    <div style={{
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

function Tile(props) {
  return (
    <div style={{
      position: 'relative',
    }}>
      {props.children}
    </div>
  );
}

const { getImage } = ImageGetter();

export default Floor;