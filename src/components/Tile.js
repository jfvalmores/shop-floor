import React, { useState } from 'react';
import TileObject from './TileObject.js';
import { makeStyles } from '@material-ui/core';

function Tile(props) {
  const [object, setObject] = useState(null);
  const classes = styles();
  const {
    settings,
  } = props;

  function handleClick() {
    if (!settings.addRemoveObject) return;
    if (object) {
      setObject(null);
    } else {
      const { image, prefix } = settings;
      setObject({
        image,
        prefix,
      });
    }
  }

  return (
    <div
      className={classes.tile}
      style={{ backgroundColor: `${settings.background}` }}
      onClick={handleClick}>
      {object &&
        <TileObject
          {...props}
          object={object} />
      }
    </div>
  )
}

const styles = makeStyles({
  tile: {
    width: 70,
    height: 70,
    border: '.5px solid lightgrey',
    display: 'inline-block'
  }
});

export default Tile;