import { Outlet } from 'react-router-dom';
import './mocks.scss';

export function Mocks() {
  return <>
  <h1>@Mocks Container</h1>
  <Outlet />
  </>
}

export default Mocks;
