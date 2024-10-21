import styles from './groups-container.module.scss';
import { Outlet } from 'react-router-dom';
import GroupsHeader from '../groups-header/groups-header';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSummarySpaces } from '../util/http';

// Define the shape of the space object
interface Space {
  _id: string; // Adjust type as necessary
  name: string;
}

interface GroupContextType {
  summarySpaces: Space[];
  activeSpace: Space | null;
  setActiveSpace: (space: Space | null) => void; // Function to update activeSpace
}

const GroupContext = createContext<GroupContextType>({
  summarySpaces: [],
  activeSpace: null,
  setActiveSpace: () => {},
});

export function GroupsContainer() {
  const [activeSpace, setActiveSpace] = useState<Space | null>(null);

  const {
    data: summarySpaces,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['spaces', 'summary'],
    queryFn: ({ signal }) => fetchSummarySpaces({ signal }),
    enabled: true,
  });

  useEffect(() => {}, []);

  return (
    <GroupContext.Provider value={{ summarySpaces, activeSpace, setActiveSpace }}>
      <div className={styles['module-container']}>
        <GroupsHeader></GroupsHeader>
        <div className={styles['module-outlet-container']}>
          <Outlet />
        </div>
      </div>
    </GroupContext.Provider>
  );
}

export default GroupsContainer;
export const useGroupContext = () => useContext(GroupContext);
