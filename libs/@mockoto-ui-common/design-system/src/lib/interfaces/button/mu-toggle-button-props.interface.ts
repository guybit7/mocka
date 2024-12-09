import { Control } from 'react-hook-form';
import { MuButtonPropsBase } from './mu-button-base.interface';

export interface MuToggleButtonProps extends MuButtonPropsBase {
  value?: string;
  control?: Control<any>;
  options: any[];
  exclusive: boolean;
}
