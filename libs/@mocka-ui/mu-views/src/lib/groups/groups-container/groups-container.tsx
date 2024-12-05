import './groups-container.scss';
import { Outlet } from 'react-router-dom';
import GroupsHeader from '../groups-header/groups-header';
import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { muAxiosClient } from '@mu/mu-auth';
import { LayoutPrimary } from '@mockoto-ui-common/design-system';

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
    queryFn: ({ signal }) => muAxiosClient.get('/api/space/summary/getAll', { signal }),
    enabled: true,
  });

  useEffect(() => {}, []);

  // return (
  //   <GroupContext.Provider value={{}}>
  //     {/* <div className="module-container">
  //     <GroupsHeader></GroupsHeader>
  //     <div className="module-outlet-container">
  //       <Outlet />
  //     </div>
  //   </div> */}
  //     <LayoutPrimary
  //       // header={<span>Header Content</span>}
  //       body={<Outlet />}
  //       footer={<span>Spaces container footer</span>}
  //     />
  //   </GroupContext.Provider>
  // );

  return (
    <LayoutPrimary
      // header={<span>Header Content</span>}
      body={<Outlet />}
      footer={<span>Spaces container footer</span>}
    />
  );
}

export default GroupsContainer;
export const useGroupContext = () => useContext(GroupContext);
