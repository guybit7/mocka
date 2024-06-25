import { render } from '@testing-library/react';

import Mock from './mock';

describe('Mock', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Mock />);
    expect(baseElement).toBeTruthy();
  });
});
