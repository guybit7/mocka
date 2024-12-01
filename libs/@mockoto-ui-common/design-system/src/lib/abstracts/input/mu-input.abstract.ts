export interface MuInputPropsAbstract {
  label: string;
  name: string;
  value: string;
  size?: 'small' | 'medium';
  type?: string;
  error?: boolean;
  helperText?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
