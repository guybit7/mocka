import { render } from '@testing-library/react';

import SpaceForm from './space-form';

describe('SpaceForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpaceForm />);
    expect(baseElement).toBeTruthy();
  });
});
