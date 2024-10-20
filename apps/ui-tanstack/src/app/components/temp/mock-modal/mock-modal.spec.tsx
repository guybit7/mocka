import { render } from '@testing-library/react';

import MockModal from './mock-modal';

describe('MockModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MockModal />);
    expect(baseElement).toBeTruthy();
  });
});
