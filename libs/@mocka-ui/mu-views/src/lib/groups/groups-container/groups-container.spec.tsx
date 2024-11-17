import { render } from '@testing-library/react';

import GroupsContainer from './groups-container';

describe('GroupsContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupsContainer />);
    expect(baseElement).toBeTruthy();
  });
});
