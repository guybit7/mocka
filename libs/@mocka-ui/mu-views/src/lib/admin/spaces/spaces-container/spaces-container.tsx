import { Outlet } from 'react-router-dom';
import './spaces-container.scss';
import { LayoutPrimary } from '@mockoto-ui-common/design-system';

export function SpacesContainer() {
  return (
    <div className="space-container">
      {/* <SpacesHeader /> */}
      <LayoutPrimary
        // header={<span>Header Content</span>}
        body={<Outlet />}
        footer={<span>Spaces container footer</span>}
      />
    </div>
  );
}

export default SpacesContainer;
