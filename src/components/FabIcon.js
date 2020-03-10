import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles'


const FabIcon = (props) => {
  const classes = styles(props);

  return (
    <Tooltip title={props.title} aria-label={String(props.title).toLowerCase()}>
      <Fab
        color="primary"
        className={classes.absolute}
        onClick={props.onClick}
      >
        {props.children}
      </Fab>
    </Tooltip>
  );
}

const styles = makeStyles(theme => ({
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: props => theme.spacing(props.right || 3),
  }
}))

export default FabIcon;