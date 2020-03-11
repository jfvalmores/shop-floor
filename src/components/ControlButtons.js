import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';

const ControlButtons = (props) => {
  const classes = styles();

  return (
    <div className={classes.ctrlButtons}>
      {props.formState === 'VIEW' &&
        <React.Fragment>
          <Button
            variant="contained"
            color="default"
            onClick={props.handleDelete}
          >
            <DeleteIcon />{` Delete`}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleEdit}
          >
            <EditIcon />{` Edit`}
          </Button>
        </React.Fragment>
      }
      {props.formState !== 'VIEW' &&
        <React.Fragment>
          <Button
            variant="contained"
            color="default"
            onClick={props.handleCancel}
          >
            <BlockIcon />{` Cancel`}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleSave}
          >
            <SaveIcon />{` Save`}
          </Button>
        </React.Fragment>
      }
    </div>
  );
}

const styles = makeStyles({
  ctrlButtons: {
    padding: 16,
    '& button': {
      margin: 3
    }
  }
});

export default ControlButtons;