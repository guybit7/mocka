import { LayoutPrimary } from '@mockoto-ui-common/design-system';
import { Outlet } from 'react-router-dom';
import './spaces-container.scss';

export function SpacesContainer() {
  return <LayoutPrimary body={<Outlet />} footer={<span>Spaces container footer</span>} />;
}

export default SpacesContainer;
