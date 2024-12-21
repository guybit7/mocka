import { MuTableHeaderItem, MuTableHeaderType } from '@mockoto-ui-common/ui-components';

export const spacesTableHeaders: MuTableHeaderItem[] = [
  {
    id: 'name',
    type: MuTableHeaderType.TEXT,
    field: 'name',
    label: 'Name',
  },
  {
    id: 'id',
    type: MuTableHeaderType.TEXT,
    field: '_id',
    label: 'ID',
  },
];
