import { FormControl, TextField } from '@mui/material';
import { MuInputProps } from '../../interfaces/input/';
import './mu-input.scss';

export const MuInput: React.FC<MuInputProps> = ({
  label,
  name,
  value,
  size = 'small',
  type = 'text',
  error,
  helperText,
  onChange,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <TextField
        type={type}
        size={size}
        label={label}
        variant="outlined"
        name={name}
        value={value}
        error={error}
        helperText={helperText}
        onChange={onChange}
        {...props}
      />
    </FormControl>
  );
};

export default MuInput;
