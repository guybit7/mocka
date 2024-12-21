import { render } from '@testing-library/react';

import Capture from './capture';

describe('Capture', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Capture />);
    expect(baseElement).toBeTruthy();
  });
});
