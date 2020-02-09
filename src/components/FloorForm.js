import React, { useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import InputField from './InputField.js';
import CheckBox from './CheckBox.js';
import ColorPicker from './ColorPicker.js';
import SelectDropdown from './SelectDropdown.js';
import ImageGetter from '../utils/ImageGetter.js';

function FloorForm(props) {
  const classes = styles();
  const imageList = [
    { data: 'default', label: 'Default' },
    { data: 'seat', label: 'Seat' },
    { data: 'largeTable', label: 'Large Table' },
    { data: 'masseuse', label: 'Masseuse' },
    { data: 'customer', label: 'Customer' },
    { data: 'doctor', label: 'Doctor' },
    { data: 'barber', label: 'Barber' },
    { data: 'room', label: 'Room' },
    { data: 'vehicle', label: 'Vehicle' },
    { data: 'workstation', label: 'Workstation' },
    { data: 'machine', label: 'Machine' },
  ];
  const [state, setState] = React.useState({
    width: 8,
    height: 8,
    floorName: '',
    background: '#CCFF99',
    activeFlag: true,
    arrangeObject: false,
    addRemoveObject: true,
    image: imageList[0],
    prefix: 'Table',
  });

  useEffect(() => {
    props.onChange(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function handleChange(id, value) {
    if (id === 'image') {
      const prefix = value.label === 'Default' ? 'Table' : value.label;
      setState({
        ...state,
        prefix,
        [id]: value
      });
    } else {
      setState({
        ...state,
        [id]: value
      });
    }
  }

  return (
    <div>
      <Divider />
      <div className={classes.content}>
        <InputField
          id="floorName"
          label="Name"
          variant="outlined"
          required
          value={state.floorName}
          onChange={handleChange}
        />

        <CheckBox
          label="Active"
          id="activeFlag"
          checked={state.activeFlag}
          onChange={handleChange}
          value={state.activeFlag} />

      </div>
      <Divider />
      <div className={classes.content}>
        <ColorPicker
          id="background"
          label="Background"
          onChange={handleChange} />

        <div style={{ display: 'flex' }}>
          <InputField
            instantUpdate
            id="width"
            label="Width"
            type="number"
            style={{ width: 90, margin: 5 }}
            onChange={handleChange}
            value={state.width} />

          <InputField
            instantUpdate
            id="height"
            label="Height"
            type="number"
            style={{ width: 90, margin: 5 }}
            onChange={handleChange}
            value={state.height} />
        </div>

      </div>
      <Divider />

      <div className={classes.content}>

        <CheckBox
          switchBtn
          id="addRemoveObject"
          label="Add/Remove Object"
          onChange={handleChange}
          value={state.addRemoveObject}
          checked={state.addRemoveObject} />

        <CheckBox
          switchBtn
          id="arrangeObject"
          label="Arrange Object"
          onChange={handleChange}
          value={state.arrangeObject}
          checked={state.arrangeObject} />

        {state.addRemoveObject &&
          <>
            <div>
              <SelectDropdown
                id="image"
                label="Image"
                value={state.image}
                onChange={handleChange}
                dataProvider={imageList} />
            </div>
            <div>
              {state.image.data &&
                <img
                  style={{ padding: 10 }}
                  src={getImage(state.image.data)}
                  alt="Table" />
              }
            </div>
            <InputField
              id="prefix"
              label="Prefix"
              type="text"
              onChange={handleChange}
              value={state.prefix} />
          </>
        }

      </div>
    </div>
  );
}

const { getImage } = ImageGetter();

const styles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default FloorForm;