import { render } from '@testing-library/react';

import SpacesTable from './spaces-table';

describe('SpacesTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpacesTable />);
    expect(baseElement).toBeTruthy();
  });
});
