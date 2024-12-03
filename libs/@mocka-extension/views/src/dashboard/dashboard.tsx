import { MuFormSelect, MuFormTextField } from '@mockoto-ui-common/design-system';
import { Box, Button } from '@mui/material';
import { sendMessage } from '@me/common';
import { useForm } from 'react-hook-form';
import './dashboard.scss';
import SelectBrowserTab from './components/select-browser-tab/select-browser-tab';
import { useQuery } from '@tanstack/react-query';
import { meAxiosClient } from '@me/auth';
import { useEffect, useState } from 'react';

interface Tab {
  id: number;
  label: string;
}

interface IDashboardInput {
  domainValue: string;
  selectedTab: Tab | null;
  space: any;
  group: any;
}

const defaultValues = {
  domainValue: 'http://localhost:3000',
  selectedTab: null,
  space: null,
  group: null,
};

export function Dashboard() {
  const [recording, setRecording] = useState(false);
  const { handleSubmit, control, setValue, watch, getValues } = useForm<IDashboardInput>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const { data: spaces, refetch: refetchSpaces } = useQuery({
    queryKey: ['spaces-summary'],
    queryFn: ({ signal }) => meAxiosClient.get<any, any>(`/api/space/summary/getAll`, { signal }),
    enabled: false,
  });

  const watchedSpace = watch('space');

  const { data: groups, refetch: refetchGroups } = useQuery({
    queryKey: ['spaces-summary', { id: watchedSpace?._id }],
    queryFn: ({ signal }) => meAxiosClient.get<any, any>(`/api/group/getAll/${watchedSpace?._id}`, { signal }),
    enabled: watchedSpace != null,
  });

  useEffect(() => {
    if (watchedSpace) {
      setValue('group', null);
      refetchGroups(watchedSpace?._id);
    }
  }, [watchedSpace]);

  const domainValidationRules = {
    required: 'Domain is required',
  };

  const handlerSelectedTab = (tab: Tab | null) => {
    setValue('selectedTab', tab);
  };

  useEffect(() => {
    refetchSpaces();
  }, [refetchSpaces]);

  const onSubmit = async (data: IDashboardInput) => {
    const messageResponse = await sendMessage({
      type: 'START',
      payload: {
        id: data.selectedTab?.id,
        groupId: data.group._id,
        domainList: [data.domainValue],
      },
    });

    setRecording(true);
  };

  const handleStop = async () => {
    const messageResponse = await sendMessage({
      type: 'STOP',
      payload: {
        tabId: getValues().selectedTab?.id,
      },
    });
    setTimeout(() => {
      setRecording(false);
    }, 1000);
  };

  return (
    <Box className="dashboard-container">
      <Box className="dashboard-form">
        <MuFormTextField
          id="domain"
          name="domainValue"
          control={control}
          rules={domainValidationRules}
          label="Domain"
        />
        <SelectBrowserTab selectedTab={handlerSelectedTab} />
        <MuFormSelect
          id="space"
          label="Select Space"
          name="space"
          optionValue="_id"
          optionLabel="name"
          options={spaces}
          control={control}
          rules={{
            required: 'Space is required',
          }}
        />
        <MuFormSelect
          id="group"
          label="Select Group"
          name="group"
          optionValue="_id"
          optionLabel="name"
          options={groups}
          control={control}
          rules={{
            required: 'Group is required',
          }}
        />
      </Box>
      <Box className="dashboard-actions">
        {!recording && (
          <Button
            onClick={handleSubmit(onSubmit)}
            variant={'contained'}
            sx={{ background: 'rgb(0 120 0)', color: 'white' }}
          >
            Record
          </Button>
        )}

        {recording && (
          <Button onClick={handleStop} variant={'contained'} sx={{ background: 'rgb(139, 0, 0)', color: 'white' }}>
            STOP
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
