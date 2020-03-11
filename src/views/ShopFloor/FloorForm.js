/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import {
  CheckBox,
  InputField,
  ColorPicker,
  SelectDropdown,
} from '../../components/';
import ImageGetter from '../../utils/ImageGetter.js';

function FloorForm(props) {
  const classes = styles();
  const {
    mParams,
    handleChange
  } = props;

  const handleImageChange = (id, value) => {
    handleChange('MULTIPLE', {
      'fprefix': String(value.prefix).trim() === 'Default' ? 'Table' : value.prefix,
      [id]: value
    });
  }

  return (
    <div>
      <Divider />
      <div className={classes.content}>
        <InputField
          id="fname"
          label="Name"
          variant="outlined"
          required
          value={mParams.fname}
          disabled={props.formState === 'VIEW'}
          onChange={handleChange}
        />
        <CheckBox
          label="Active"
          id="factive_flag"
          checked={mParams.factive_flag}
          onChange={handleChange}
          disabled={props.formState === 'VIEW'}
          value={mParams.factive_flag} />
      </div>
      <Divider />
      <div className={classes.content}>
        <ColorPicker
          id="fbackground"
          label="Background"
          value={mParams.fbackground}
          onChange={handleChange}
          disabled={props.formState === 'VIEW'} />
        <div style={{ display: 'flex' }}>
          <InputField
            instantUpdate
            id="fwidth"
            label="Width"
            type="number"
            style={{ width: 90, margin: 5 }}
            disabled={props.formState === 'VIEW'}
            onChange={handleChange}
            value={mParams.fwidth} />
          <InputField
            instantUpdate
            id="fheight"
            label="Height"
            type="number"
            style={{ width: 90, margin: 5 }}
            disabled={props.formState === 'VIEW'}
            onChange={handleChange}
            value={mParams.fheight} />
        </div>
      </div>
      <Divider />
      {props.formState !== 'VIEW' &&
        <div className={classes.content}>
          <CheckBox
            switchBtn
            id="fupdate_mode_flag"
            label="Add/Remove Object"
            onChange={handleChange}
            value={mParams.fupdate_mode_flag}
            checked={mParams.fupdate_mode_flag}
            disabled={props.formState === 'VIEW'} />
          <CheckBox
            switchBtn
            id="farrange_mode_flag"
            label="Arrange Object"
            onChange={handleChange}
            value={mParams.farrange_mode_flag}
            checked={mParams.farrange_mode_flag}
            disabled={props.formState === 'VIEW'} />
          {mParams.fupdate_mode_flag &&
            <>
              <div>
                <SelectDropdown
                  id="fimage_type"
                  label="Image"
                  value={mParams.fimage_type}
                  onChange={handleImageChange}
                  dataProvider={imageList}
                  disabled={props.formState === 'VIEW'} />
              </div>
              <div>
                {mParams.fimage_type.data &&
                  <img
                    style={{ padding: 10 }}
                    src={getImage(mParams.fimage_type.data)}
                    alt="Table" />
                }
              </div>
              <InputField
                id="fprefix"
                label="Prefix"
                type="text"
                disabled={props.formState === 'VIEW'}
                onChange={handleChange}
                value={mParams.fprefix} />
            </>
          }
        </div>
      }
      <Divider />
      {props.controlButtons}
    </div>
  );
}

const { getImage, imageList } = ImageGetter();

const styles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default FloorForm;