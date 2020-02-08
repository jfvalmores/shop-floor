import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

function InputField(props) {
  const [mValue, setValue] = useState('');
  const {
    id,
    type,
    value,
    label,
    style,
    onBlur,
    variant,
    onChange,
    instantUpdate,
  } = props;

  useEffect(() => {
    setValue(value);
  }, [value]);

  function handleChange(e) {
    const { id, value } = e.target;
    setValue(value);
    if (instantUpdate) {
      updateMain(id, value);
    }
  }

  function handleBlur(e) {
    const { id, value } = e.target;
    if (onBlur) {
      onBlur(id, value);
    }

    updateMain(id, value);
  }

  function updateMain(id, value) {
    if (onChange) {
      onChange(id, value);
    }
  }

  return (
    <TextField
      required
      id={id}
      type={type}
      label={label}
      style={style}
      value={mValue}
      variant={variant}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}

export default InputField;