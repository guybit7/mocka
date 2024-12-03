import { Controller } from 'react-hook-form';
import './mu-form-text-field.scss';
import { FormControl, TextField } from '@mui/material';
import { MuInputProps } from '../../interfaces/input/mu-input.interface';

export const MuFormTextField: React.FC<MuInputProps> = ({
  label,
  id,
  name,
  size = 'small',
  type = 'text',
  control,
  rules,
  ...props
}) => {
  return (
    <FormControl size={size}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextField
            helperText={error ? error.message : null}
            size={size}
            type={type}
            error={!!error}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
          />
        )}
      />
    </FormControl>
  );
};
