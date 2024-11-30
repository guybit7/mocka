import { render } from '@testing-library/react';
import MuTable from './mu-table';

describe('MuTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuTable />);
    expect(baseElement).toBeTruthy();
  });
});
