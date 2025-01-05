import { LayoutPrimary } from '@mockoto-ui-common/design-system';
import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { User } from '../interfaces/user';
import './users-container.scss';

interface UsersContextType {
  users: User[];
  activeUser: User | null;
  setActiveUser: (user: User | null) => void;
}

const UserContext = createContext<UsersContextType>({
  users: [],
  activeUser: null,
  setActiveUser: () => null,
});
export function UsersContainer() {
  const [activeUser, setActiveUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ users: [], activeUser, setActiveUser }}>
      <LayoutPrimary body={<Outlet />} />
    </UserContext.Provider>
  );
}

export default UsersContainer;
