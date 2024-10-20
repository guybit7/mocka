import { render } from '@testing-library/react';

import AdminContainer from './admin-container';

describe('AdminContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminContainer />);
    expect(baseElement).toBeTruthy();
  });
});
