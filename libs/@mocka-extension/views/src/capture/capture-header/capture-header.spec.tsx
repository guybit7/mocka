import { render } from '@testing-library/react';

import CaptureHeader from './capture-header';

describe('CaptureHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CaptureHeader />);
    expect(baseElement).toBeTruthy();
  });
});
