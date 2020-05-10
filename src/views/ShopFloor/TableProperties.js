import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  InputField,
  SelectDropdown,
} from '../../components/';
import ImageGetter from '../../utils/ImageGetter.js';

const TableProperties = (props) => {
  const [mKeys, setKeys] = useState({
    fname: '',
    fpax: 4,
    fimage_type: imageList[0],
  });

  useEffect(() => {
    setKeys({
      ...mKeys,
      ...props.mKeys
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mKeys]);

  const handleClose = () => {
    if (props.handleClose)
      props.handleClose();
  }

  const handleSave = () => {
    if (String(mKeys.fname) === '') {
      props.popupMessage('Please enter Table Name.');
      return false;
    } else if (Number(mKeys.fname) <= 0) {
      props.popupMessage('Please enter valid Pax.');
      return false;
    }

    props.handleSave(mKeys);
  }

  const handleChange = (id, value) => {
    setKeys({
      ...mKeys,
      [id]: value
    });
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={props.open}
        disableBackdropClick={props.formState !== 'VIEW'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Table Properties</DialogTitle>
        <DialogContent>
          <div style={{ margin: 10 }}>
            <InputField
              id="fname"
              label="Table Name"
              variant="outlined"
              required
              value={mKeys.fname}
              disabled={props.formState === 'VIEW'}
              onChange={handleChange}
            />
          </div>
          <div style={{ margin: 10 }}>
            <InputField
              id="fpax"
              label="# of Pax"
              variant="outlined"
              type="number"
              required
              value={mKeys.fpax}
              disabled={props.formState === 'VIEW'}
              onChange={handleChange}
            />
          </div>
          <div style={{ margin: 10 }}>
            <SelectDropdown
              id="fimage_type"
              label="Table Type"
              value={mKeys.fimage_type}
              onChange={handleChange}
              dataProvider={imageList}
              disabled={props.formState === 'VIEW'} />
          </div>
          <div style={{ margin: 10 }}>
            {mKeys.fimage_type.data &&
              <img
                style={{ padding: 10, maxWidth: 200, maxHeight: 125 }}
                src={getImage(mKeys.fimage_type.data)}
                alt="Table" />
            }
          </div>
        </DialogContent>
        <DialogActions>
          {props.formState === 'VIEW' ?
            <React.Fragment>
              <Button onClick={handleClose} color="primary" autoFocus>
                OK
              </Button>
            </React.Fragment>
            :
            <React.Fragment>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary" autoFocus>
                Save
              </Button>
            </React.Fragment>
          }
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const { getImage, imageList } = ImageGetter();

export default TableProperties;