import { MuInputBase } from './mu-input-base.interface';

export interface MuSelectProps extends MuInputBase {
  options: [];
  optionLabel?: string;
  optionValue?: string;
}
