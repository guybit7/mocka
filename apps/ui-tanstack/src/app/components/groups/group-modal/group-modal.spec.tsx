import { render } from '@testing-library/react';

import GroupModal from './group-modal';

describe('GroupModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupModal />);
    expect(baseElement).toBeTruthy();
  });
});
