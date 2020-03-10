/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import InputField from './InputField.js';
import CheckBox from './CheckBox.js';
import ColorPicker from './ColorPicker.js';
import SelectDropdown from './SelectDropdown.js';
import ImageGetter from '../utils/ImageGetter.js';

function FloorForm(props) {
  const classes = styles();
  const {
    mParams,
    handleChange
  } = props;

  return (
    <div>
      <Divider />
      <div className={classes.content}>
        <InputField
          id="floorName"
          label="Name"
          variant="outlined"
          required
          value={mParams.floorName}
          disabled={props.formState === 'VIEW'}
          onChange={handleChange}
        />

        <CheckBox
          label="Active"
          id="activeFlag"
          checked={mParams.activeFlag}
          onChange={handleChange}
          disabled={props.formState === 'VIEW'}
          value={mParams.activeFlag} />

      </div>
      <Divider />
      <div className={classes.content}>
        <ColorPicker
          id="background"
          label="Background"
          value={mParams.background}
          onChange={handleChange}
          disabled={props.formState === 'VIEW'} />

        <div style={{ display: 'flex' }}>
          <InputField
            instantUpdate
            id="width"
            label="Width"
            type="number"
            style={{ width: 90, margin: 5 }}
            disabled={props.formState === 'VIEW'}
            onChange={handleChange}
            value={mParams.width} />

          <InputField
            instantUpdate
            id="height"
            label="Height"
            type="number"
            style={{ width: 90, margin: 5 }}
            disabled={props.formState === 'VIEW'}
            onChange={handleChange}
            value={mParams.height} />
        </div>

      </div>
      <Divider />

      {props.formState !== 'VIEW' &&
        <div className={classes.content}>

          <CheckBox
            switchBtn
            id="addRemoveObject"
            label="Add/Remove Object"
            onChange={handleChange}
            value={mParams.addRemoveObject}
            checked={mParams.addRemoveObject}
            disabled={props.formState === 'VIEW'} />

          <CheckBox
            switchBtn
            id="arrangeObject"
            label="Arrange Object"
            onChange={handleChange}
            value={mParams.arrangeObject}
            checked={mParams.arrangeObject}
            disabled={props.formState === 'VIEW'} />

          {mParams.addRemoveObject &&
            <>
              <div>
                <SelectDropdown
                  id="image"
                  label="Image"
                  value={mParams.image}
                  onChange={handleChange}
                  dataProvider={imageList}
                  disabled={props.formState === 'VIEW'} />
              </div>
              <div>
                {mParams.image.data &&
                  <img
                    style={{ padding: 10 }}
                    src={getImage(mParams.image.data)}
                    alt="Table" />
                }
              </div>
              <InputField
                id="prefix"
                label="Prefix"
                type="text"
                disabled={props.formState === 'VIEW'}
                onChange={handleChange}
                value={mParams.prefix} />
            </>
          }

        </div>
      }
      <Divider />
      { props.controlButtons }
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