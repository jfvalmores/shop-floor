import React, { useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import InputField from './InputField.js';
import CheckBox from './CheckBox.js';
import ColorPicker from './ColorPicker.js';

function FloorForm(props) {
  const classes = styles();
  const [state, setState] = React.useState({
    floorName: '',
    activeFlag: true,
    width: 10,
    height: 10,
    arrangeMode: false,
    background: '#00D753',
  });

  useEffect(() => {
    props.onChange(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function handleChange(id, value) {
    setState({
      ...state,
      [id]: value
    });
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
          label="Arrange Mode"
          id="arrangeMode"
          checked={state.arrangeMode}
          onChange={handleChange}
          value={state.arrangeMode} />

      </div>
    </div>
  );
}

const styles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default FloorForm;