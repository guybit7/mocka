import { MuTableHeaderItem, MuTableHeaderType } from '@mockoto-ui-common/ui-components';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const groupsTableHeaders: MuTableHeaderItem[] = [
  {
    type: MuTableHeaderType.ICON,
    id: 'MOCK_LIST',
    action: {
      name: 'Mocks List',
      icon: FormatListBulletedIcon,
    },
  },
  {
    type: MuTableHeaderType.TEXT,
    id: 'name',
    field: 'name',
    label: 'Name',
  },
  {
    type: MuTableHeaderType.TEXT,
    id: 'id',
    field: '_id',
    label: 'ID',
  },
];
