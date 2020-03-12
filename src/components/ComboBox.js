import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ComboBox = (props) => {
  const [mValue, setValue] = useState('');
  const {
    id,
    value,
    label,
    disabled,
    onChange,
    dataProvider,
  } = props;

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleChange = (e, value) => {
    setValue(value);
    if (onChange) {
      onChange(id, value);
    }
  }

  return (
    <Autocomplete
      id={id}
      autoHighlight
      value={mValue}
      disableClearable
      disabled={disabled}
      options={dataProvider}
      onChange={handleChange}
      getOptionLabel={option => option.label || ''}
      style={{ width: 200 }}
      renderInput={params =>
        <TextField
          {...params}
          label={label}
          variant="outlined"
        />
      }
    />
  );
}

export default ComboBox;