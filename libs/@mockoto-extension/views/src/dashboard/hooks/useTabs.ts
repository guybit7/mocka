import { getTabs } from '@me/common';
import { useEffect, useState } from 'react';

export interface Tab {
  label: string;
  id: number;
}

export function useTabs() {
  const [tabs, setTabs] = useState<Tab[]>([]);

  const initTabsList = async () => {
    const tabsData = await getTabs();
    const formattedTabs = tabsData.map((tab: any) => ({
      label: tab.title,
      id: tab.id,
    }));
    setTabs(formattedTabs);
  };

  useEffect(() => {
    initTabsList();
  }, []);

  return { tabs, initTabsList };
}
