import { render } from '@testing-library/react';

import MuModal from './mu-modal';

describe('MuModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuModal />);
    expect(baseElement).toBeTruthy();
  });
});
