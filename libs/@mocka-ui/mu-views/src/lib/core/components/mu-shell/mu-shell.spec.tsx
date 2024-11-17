import { render } from '@testing-library/react';

import MuShell from './mu-shell';

describe('MuShell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuShell />);
    expect(baseElement).toBeTruthy();
  });
});
