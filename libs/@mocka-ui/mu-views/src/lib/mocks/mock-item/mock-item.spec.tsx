import { render } from '@testing-library/react';

import MockItem from './mock-item';

describe('MockItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MockItem />);
    expect(baseElement).toBeTruthy();
  });
});
