import { render } from '@testing-library/react';

import MuLayout from './mu-layout';

describe('MuLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuLayout />);
    expect(baseElement).toBeTruthy();
  });
});
