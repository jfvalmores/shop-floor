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
    if (settings.addRemoveObject) {
      if (object) {
        setObject(null);
      } else {
        const { image, prefix } = settings;
        setObject({
          image,
          prefix,
        });
      }
    } else {

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
    width: 80,
    height: 80,
    border: '.5px solid lightgrey',
    display: 'inline-block'
  }
});

export default Tile;