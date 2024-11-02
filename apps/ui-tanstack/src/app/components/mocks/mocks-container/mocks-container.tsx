import { Outlet, useParams } from 'react-router-dom';
import styles from './mocks-container.module.scss';
import MocksHeader from '../mocks-header/mocks-header';
import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@ui-tanstack/common';

interface Group {
  _id: string; // Adjust type as necessary
  name: string;
}

interface MocksContextType {
  activeGroup: Group | null;
  setActiveGroup: (group: Group | null) => void; // Function to update active group
}

const MocksContext = createContext<MocksContextType>({
  activeGroup: null,
  setActiveGroup: () => {},
});

export function MocksContainer() {
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const { groupId } = useParams();

  const {
    data: theActiveGroup,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['active-group', groupId],
    queryFn: ({ signal }) => axiosClient.get(`/api/group/${groupId}`, { signal }),
    enabled: !!groupId,
  });

  useEffect(() => {
    if (theActiveGroup) {
      setActiveGroup(theActiveGroup);
    }
  }, [theActiveGroup]);

  return (
    <MocksContext.Provider value={{ activeGroup, setActiveGroup }}>
      <div className={styles['module-container']}>
        <MocksHeader></MocksHeader>
        <div className={styles['module-outlet-container']}>
          <Outlet />
        </div>
      </div>
    </MocksContext.Provider>
  );
}

export default MocksContainer;
export const useMocksContext = () => useContext(MocksContext);
