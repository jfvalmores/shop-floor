import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

function ColorPicker(props) {
  const classes = styles();
  const {
    id,
    label,
    value,
    onChange,
    disabled,
  } = props;
  const [state, setState] = useState({});

  useEffect(() => {
    setState({
      open: false, 
      color: value
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  function handleChange(newColor) {
    setState({
      ...state,
      color: newColor.hex
    });

    onChange(id, newColor.hex);
  }

  function togglePicker() {
    setState({
      ...state,
      open: !state.open
    });
  }

  function handleClose() {
    setState({
      ...state,
      open: false
    });
  }

  return (
    <>
      <div className={classes.container}>
        <span className={classes.label}>{label}:</span>
        <Button
          variant="contained"
          className={classes.colorBtn}
          style={{ backgroundColor: `${state.color}` }}
          onClick={togglePicker}
          disabled={disabled}
        >
          C
        </Button>
        {state.open &&
          <div className={classes.popover}>
            <div className={classes.cover} onClick={handleClose} />
            <ChromePicker
              color={state.color}
              onChange={handleChange} />
          </div>
        }
      </div>

    </>
  );
}

const styles = makeStyles({
  popover: {
    position: 'fixed',
    zIndex: 2,
  },
  cover: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  label: {
    marginRight: 10
  },
  colorBtn: {
    height: 32,
    minWidth: 40,
    color: 'transparent !important',
  },
  container: {
    margin: '8px 0'
  }
});

export default ColorPicker;