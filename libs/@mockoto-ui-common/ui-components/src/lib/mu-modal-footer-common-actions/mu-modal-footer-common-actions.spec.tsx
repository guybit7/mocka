import { render } from '@testing-library/react';

import MuModalFooterCommonActions from './mu-modal-footer-common-actions';

describe('MuModalFooterCommonActions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuModalFooterCommonActions />);
    expect(baseElement).toBeTruthy();
  });
});
