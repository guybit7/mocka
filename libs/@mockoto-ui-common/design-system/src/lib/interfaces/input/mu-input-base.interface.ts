import { Control, RegisterOptions } from 'react-hook-form';

export interface MuInputBase {
  id: string;
  label: string;
  name: string;
  value?: string;
  size?: 'small' | 'medium';
  type?: string;
  error?: boolean;
  helperText?: string;
  setValue?: any;
  control?: Control<any>;
  rules: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  onChange?: any;
}
