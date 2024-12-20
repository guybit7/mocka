import { Box, IconButton } from '@mui/material';

import { MuFormSelect } from '@mockoto-ui-common/design-system';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Tab, useTabs } from '../../hooks';
import './select-browser-tab.scss';

interface ISelectBrowserTab {
  tab: Tab | null;
}

const defaultValues = {
  tab: null,
};

export interface SelectBrowserTabProps {
  selectedTab: (tab: Tab | null) => void;
}

export function SelectBrowserTab({ selectedTab }: SelectBrowserTabProps) {
  const { tabs, initTabsList } = useTabs();
  const { control, watch } = useForm<ISelectBrowserTab>({
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const tabsValidationRules = {
    required: 'tab is required',
  };

  const watchedTab = watch('tab');

  useEffect(() => {
    if (watchedTab) {
      selectedTab(watchedTab);
    }
  }, [watchedTab]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <MuFormSelect
        id="tab"
        label="Select Tab"
        name="tab"
        options={tabs as []}
        control={control}
        optionLabel="label"
        optionValue="id"
        rules={tabsValidationRules}
      />
      <IconButton
        color="primary"
        aria-label="refresh"
        onClick={initTabsList}
        size="small"
        sx={{
          padding: '8px',
        }}
      >
        <RefreshIcon />
      </IconButton>
    </Box>
  );
}

export default SelectBrowserTab;
