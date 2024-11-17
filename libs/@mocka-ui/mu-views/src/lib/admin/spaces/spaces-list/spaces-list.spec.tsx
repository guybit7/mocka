import { render } from '@testing-library/react';

import SpacesList from './spaces-list';

describe('SpacesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpacesList />);
    expect(baseElement).toBeTruthy();
  });
});
