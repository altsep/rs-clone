import { Box, InputLabel, TextField, TextFieldProps } from '@mui/material';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

export default function EditProfileInput<T extends FieldValues>(props: UseControllerProps<T> & TextFieldProps) {
  const { field, fieldState } = useController<T>(props);
  const { value, onChange, onBlur } = field;
  const { error } = fieldState;
  const { children, helperText } = props;
  return (
    <Box>
      <InputLabel sx={{ mb: '5px', fontWeight: '700', fontSize: '0.9rem' }}>{children}</InputLabel>
      <TextField
        fullWidth
        autoComplete="off"
        size="small"
        error={!!error}
        helperText={helperText}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Box>
  );
}
