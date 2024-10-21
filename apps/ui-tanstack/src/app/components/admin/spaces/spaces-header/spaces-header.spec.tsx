import { render } from '@testing-library/react';

import SpacesHeader from './spaces-header';

describe('SpacesHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpacesHeader />);
    expect(baseElement).toBeTruthy();
  });
});
