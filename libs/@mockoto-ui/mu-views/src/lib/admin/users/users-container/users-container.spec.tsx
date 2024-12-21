import { render } from '@testing-library/react';

import UsersContainer from './users-container';

describe('UsersContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UsersContainer />);
    expect(baseElement).toBeTruthy();
  });
});
