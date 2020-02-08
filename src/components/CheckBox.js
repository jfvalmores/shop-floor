import React, { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';

function CheckBox(props) {
  const [mValue, setValue] = useState(false);
  const {
    id,
    label,
    value,
    checked,
    onChange,
    switchBtn,
  } = props;

  useEffect(() => {
    setValue(mValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function handleChange(e) {
    const { id, checked } = e.target;
    setValue(checked);
    onChange(id, checked);
  }

  return (
    <FormControlLabel
      control={
        switchBtn ?
          <Switch
            id={id}
            value={mValue}
            checked={checked}
            onChange={handleChange}
          />
          :
          <Checkbox
            id={id}
            value={mValue}
            checked={checked}
            onChange={handleChange}
          />
      }
      label={label}
    />
  );
}

export default CheckBox;