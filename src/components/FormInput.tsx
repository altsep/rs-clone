import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

export default function FormInput<T extends FieldValues>(props: UseControllerProps<T> & TextFieldProps) {
  const { field, fieldState } = useController<T>(props);
  const { label, type, InputProps } = props;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value);
  return (
    <TextField
      type={type}
      fullWidth
      size="medium"
      variant="outlined"
      label={label}
      value={field.value}
      name={field.name}
      error={!!fieldState.error}
      onChange={onChange}
      onBlur={field.onBlur}
      inputRef={field.ref}
      helperText={fieldState.error?.message}
      InputProps={InputProps}
    />
  );
}
