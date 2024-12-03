import { render } from '@testing-library/react';

import MuFormTextField from './mu-form-text-field';

describe('MuFormTextField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuFormTextField />);
    expect(baseElement).toBeTruthy();
  });
});
