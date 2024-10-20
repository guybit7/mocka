import { render } from '@testing-library/react';

import SpaceItem from './space-item';

describe('SpaceItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpaceItem />);
    expect(baseElement).toBeTruthy();
  });
});
