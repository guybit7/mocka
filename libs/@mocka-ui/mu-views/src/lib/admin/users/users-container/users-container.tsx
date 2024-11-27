import { Outlet } from 'react-router-dom';
import './users-container.scss';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LayoutPrimary } from '@mocka-ui/mu-design-system';
import { createContext, useState } from 'react';
import { User } from '../interfaces/user';

interface UsersContextType {
  users: User[];
  activeUser: User | null;
  setActiveUser: (user: User | null) => void;
}

const UserContext = createContext<UsersContextType>({
  users: [],
  activeUser: null,
  setActiveUser: () => {},
});
export function UsersContainer() {
  const [activeUser, setActiveUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ users: [], activeUser, setActiveUser }}>
      <LayoutPrimary
        header={<span>Header Content</span>}
        body={<Outlet />}
        footer={<span>Users container footer</span>}
      />
    </UserContext.Provider>
  );
}

export default UsersContainer;
