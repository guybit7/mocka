import { LayoutPrimary } from '@mockoto-ui-common/design-system';
import { Outlet } from 'react-router-dom';
import './groups-container.scss';
export function GroupsContainer() {
  return <LayoutPrimary body={<Outlet />} footer={<span>Groups container footer</span>} />;
}

export default GroupsContainer;
