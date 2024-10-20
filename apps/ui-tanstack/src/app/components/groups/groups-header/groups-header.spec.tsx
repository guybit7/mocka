import { render } from '@testing-library/react';

import GroupsHeader from './groups-header';

describe('GroupsHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupsHeader />);
    expect(baseElement).toBeTruthy();
  });
});
