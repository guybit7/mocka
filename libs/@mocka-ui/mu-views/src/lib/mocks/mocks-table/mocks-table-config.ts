import { MuTableHeaderItem, MuTableHeaderType } from '@mockoto-ui-common/ui-components';
import TabIcon from '@mui/icons-material/Tab';
export const mocksTableHeaders: MuTableHeaderItem[] = [
  {
    type: MuTableHeaderType.ICON,
    id: 'MOCK_LINK',
    action: {
      name: 'Mock Link',
      icon: TabIcon,
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
