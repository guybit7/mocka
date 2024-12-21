import { render } from '@testing-library/react';

import UsersTable from './users-table';

describe('UsersTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UsersTable />);
    expect(baseElement).toBeTruthy();
  });
});
