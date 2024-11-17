import { Outlet } from 'react-router-dom';
import './spaces-container.scss';
import SpacesHeader from '../spaces-header/spaces-header';

export function SpacesContainer() {
  return (
    <div className="module-container">
      <SpacesHeader />
      <div className="module-outlet-container">
        <Outlet />
      </div>
    </div>
  );
}

export default SpacesContainer;
