import { render } from '@testing-library/react';

import MocksTable from './mocks-table';

describe('MocksTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MocksTable />);
    expect(baseElement).toBeTruthy();
  });
});
