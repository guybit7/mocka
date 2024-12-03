import { render } from '@testing-library/react';

import MuFormSelect from './mu-form-select';

describe('MuFormSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MuFormSelect />);
    expect(baseElement).toBeTruthy();
  });
});
