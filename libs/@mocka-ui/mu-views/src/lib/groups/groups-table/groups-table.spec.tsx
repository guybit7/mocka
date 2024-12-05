import { render } from '@testing-library/react';

import GroupsTable from './groups-table';

describe('GroupsTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupsTable />);
    expect(baseElement).toBeTruthy();
  });
});
