import { MuTableHeaderType, MuTableHeaderItem } from '@mockoto-ui-common/ui-components';

export const usersTableHeaders: MuTableHeaderItem[] = [
  {
    id: 'id',
    type: MuTableHeaderType.TEXT,
    field: '_id',
    label: 'ID',
  },
  {
    id: 'email',
    type: MuTableHeaderType.TEXT,
    field: 'email',
    label: 'Email',
  },
  {
    id: 'full-name',
    type: MuTableHeaderType.TEXT,
    field: 'fullName',
    label: 'Full Name',
  },
  {
    id: 'user-name',
    type: MuTableHeaderType.TEXT,
    field: 'username',
    label: 'Username',
  },
  {
    id: 'created-at',
    type: MuTableHeaderType.TEXT,
    field: 'createdAt',
    label: 'Created At',
  },
  {
    id: 'role',
    type: MuTableHeaderType.TEXT,
    field: 'role',
    label: 'Role',
  },
  {
    id: 'verified',
    type: MuTableHeaderType.TEXT,
    field: 'isVerified',
    label: 'Verified',
  },
  {
    id: 'updated-at',
    type: MuTableHeaderType.TEXT,
    field: 'updatedAt',
    label: 'Updated At',
  },
];
