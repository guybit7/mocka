import { render } from '@testing-library/react';

import CapturesTable from './captures-table';

describe('CapturesTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CapturesTable />);
    expect(baseElement).toBeTruthy();
  });
});
