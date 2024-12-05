import { MuTableHeaderType } from '../enums';

export interface MuTableHeaderItem {
  id: string;
  type: MuTableHeaderType;
  label?: string;
  field?: string;
  filterable?: boolean;
  sortable?: boolean;
  action?: ActionItem;
}

export interface ActionItem {
  name: string;
  icon: any;
}

export interface MuTableActionEvent {
  type: MuTableHeaderType;
  id: string;
  row: any;
}
