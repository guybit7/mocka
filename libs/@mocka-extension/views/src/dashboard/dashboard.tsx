import { CaptureState, defaultCaptureState, responseTypes, sendMessage, Tab, useSharedState } from '@me/common';
import { MuFormSelect, MuFormTextField } from '@mockoto-ui-common/design-system';
import { Box, Button, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SelectBrowserTab from './components/select-browser-tab/select-browser-tab';
import './dashboard.scss';

const domainValidationRules = {
  required: 'Domain is required',
};

const responseTypeRules = {
  required: 'Response Type is required',
};

export function Dashboard() {
  const [recording, setRecording] = useState(false);
  const { state, setState } = useSharedState();
  const types = useMemo(() => responseTypes(), []);
  const navigate = useNavigate();

  const { handleSubmit, control, setValue, watch, getValues, formState } = useForm<CaptureState>({
    defaultValues: defaultCaptureState,
    mode: 'onChange',
  });

  const { isValid } = formState;
  const selectedTab = watch('selectedTab');
  const handlerSelectedTab = (tab: Tab | null) => {
    setValue('selectedTab', tab);
  };

  const onSubmit = async (data: CaptureState) => {
    const messageResponse = await sendMessage({
      type: 'START',
      payload: {
        id: data.selectedTab?.id,
        groupId: data.group?._id,
        domainList: [data.domainValue],
        responseType: data.responseType.value,
      },
    });

    setState({
      captureState: {
        domainValue: data.domainValue,
        group: data.group,
        space: data.space,
        selectedTab: data.selectedTab,
        responseType: data.responseType,
        mocks: [],
      },
    });

    navigate('/captures');

    setRecording(true);
  };

  return (
    <Box className="dashboard-container">
      <Typography sx={{ fontSize: '2rem', marginBlockEnd: '1rem' }} noWrap>
        Capture Options
      </Typography>
      <Box className="dashboard-form">
        <MuFormTextField
          id="domain"
          name="domainValue"
          control={control}
          rules={domainValidationRules}
          label="Domain (singlee)"
        />
        <SelectBrowserTab selectedTab={handlerSelectedTab} />

        <MuFormSelect
          id="response-type"
          label="Response Type"
          name="responseType"
          options={types as []}
          control={control}
          optionLabel="label"
          optionValue="value"
          rules={responseTypeRules}
        />
      </Box>
      <Box className="dashboard-actions">
        {!recording && (
          <Button
            onClick={handleSubmit(onSubmit)}
            variant={'contained'}
            disabled={!isValid}
            sx={{ background: 'rgb(0 120 0)', color: 'white', width: '100%' }}
          >
            Record
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
