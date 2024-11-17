import { render } from '@testing-library/react';

import MocksList from './mocks-list';

describe('MocksList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MocksList />);
    expect(baseElement).toBeTruthy();
  });
});
