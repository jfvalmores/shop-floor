import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

function SelectDropdown(props) {
  const [mValue, setValue] = useState('');
  const {
    id,
    label,
    value,
    onChange,
    disabled,
    helperText,
    dataProvider,
  } = props;

  useEffect(() => {
    setValue(value.data);
  }, [value]);

  function handleChange(e) {
    setValue(e.target.value);
    if (onChange) {
      onChange(id, dataProvider.find(item => item.data === e.target.value));
    }
  }

  return (
    <FormControl style={{ minWidth: 160 }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={mValue}
        onChange={handleChange}
        disabled={disabled}
      >
        {dataProvider.map((item, idx) => {
          return (
            <MenuItem
              key={idx}
              value={item.data}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default SelectDropdown;