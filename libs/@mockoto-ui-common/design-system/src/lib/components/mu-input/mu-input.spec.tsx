import { render } from '@testing-library/react';

import MuInput from './mu-input';

describe('MuInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuInput />);
    expect(baseElement).toBeTruthy();
  });
});
