import { render } from '@testing-library/react';

import SpacesContainer from './spaces-container';

describe('SpacesContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpacesContainer />);
    expect(baseElement).toBeTruthy();
  });
});
