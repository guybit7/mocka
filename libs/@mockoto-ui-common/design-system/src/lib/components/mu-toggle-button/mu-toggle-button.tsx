import { FormControl, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MuToggleButtonProps } from '../../interfaces/button';
import './mu-toggle-button.scss';
import { Controller } from 'react-hook-form';

export const MuToggleButton: React.FC<MuToggleButtonProps> = ({
  label,
  id,
  name,
  size = 'small',
  control,
  options = [],
  exclusive = true,
  ...props
}) => {
  return (
    <FormControl size={size}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <ToggleButtonGroup
              value={value}
              exclusive={exclusive}
              onChange={(event, newValue) => {
                // Only update if the value changes
                if (newValue !== null) {
                  onChange(newValue);
                }
              }}
              aria-label={label || name}
              {...props}
            >
              {options.map((option: any) => (
                <ToggleButton key={option.value} value={option.value} aria-label={option.label}>
                  {option.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            {error && <p className="error-text">{error.message}</p>}
          </>
        )}
      />
    </FormControl>
  );
};

export default MuToggleButton;
