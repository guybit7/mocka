import { render } from '@testing-library/react';

import MuLogin from './mu-login';

describe('MuLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuLogin />);
    expect(baseElement).toBeTruthy();
  });
});
