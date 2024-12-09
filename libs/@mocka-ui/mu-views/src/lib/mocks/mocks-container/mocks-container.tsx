import { LayoutPrimary } from '@mockoto-ui-common/design-system';
import { Outlet } from 'react-router-dom';
import './mocks-container.scss';

export function MocksContainer() {
  return (
    <LayoutPrimary
      // header={<span>Header Content</span>}
      body={<Outlet />}
      footer={<span>Mocks container footer</span>}
    />
  );
}

export default MocksContainer;
