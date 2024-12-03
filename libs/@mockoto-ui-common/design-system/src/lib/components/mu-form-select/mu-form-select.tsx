import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { MuSelectProps } from '../../interfaces/input/mu-select.interface';
import './mu-form-select.scss';

export const MuFormSelect: React.FC<MuSelectProps> = ({
  id,
  label,
  name,
  size = 'small',
  type = 'text',
  optionLabel = 'label',
  optionValue = '_id',
  control,
  rules,
  options = [] as any[], //FIXME
  ...props
}) => {
  return (
    <FormControl size={size} fullWidth>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <InputLabel id={`label-${id}`}>{label}</InputLabel>
            <Select
              size={size}
              error={!!error}
              onChange={event => {
                onChange(options.find(option => option[optionValue] === event.target.value));
              }}
              onBlur={onBlur}
              value={value ? value[optionValue] : ''}
              fullWidth
              label={label}
              variant="outlined"
              labelId={`label-${id}`}
              id={`select-${id}`}
            >
              {options.map(option => (
                <MenuItem key={option[optionValue]} value={option[optionValue]}>
                  {option[optionLabel] || 'No Label'}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      />
    </FormControl>
  );
};
export default MuFormSelect;
