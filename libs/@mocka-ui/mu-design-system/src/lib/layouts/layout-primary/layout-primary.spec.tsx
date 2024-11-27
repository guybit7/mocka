import { render } from '@testing-library/react';

import LayoutPrimary from './layout-primary';

describe('LayoutPrimary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutPrimary />);
    expect(baseElement).toBeTruthy();
  });
});
