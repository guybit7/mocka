import { FormControl, TextField } from '@mui/material';
import { MuInputPropsAbstract } from '../../abstracts/input';
import './mu-input.scss';

export const MuInput: React.FC<MuInputPropsAbstract> = ({
  label,
  name,
  value,
  size = 'small',
  type = 'text',
  error,
  helperText,
  onChange,
  onBlur,
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
        onBlur={onBlur}
        {...props}
      />
    </FormControl>
  );
};

export default MuInput;
