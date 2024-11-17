import { render } from '@testing-library/react';

import MocksHeader from './mocks-header';

describe('MocksHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MocksHeader />);
    expect(baseElement).toBeTruthy();
  });
});
