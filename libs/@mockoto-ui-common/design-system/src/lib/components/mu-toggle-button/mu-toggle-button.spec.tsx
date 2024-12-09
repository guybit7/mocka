import { render } from '@testing-library/react';

import MuToggleButton from './mu-toggle-button';

describe('MuToggleButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuToggleButton />);
    expect(baseElement).toBeTruthy();
  });
});
