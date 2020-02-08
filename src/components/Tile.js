import React from 'react';
import Object from './Object.js';
import { makeStyles } from '@material-ui/core';

function Tile(props) {
  const classes = styles();
  const {
    background,
  } = props;

  return (
    <div
      className={classes.tile}
      style={{ backgroundColor: `${background}` }}>
      <Object />
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