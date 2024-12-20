import { meAxiosClient } from '@me/auth';
import { CaptureState, defaultCaptureState, useSharedState } from '@me/common';
import { MuFormSelect } from '@mockoto-ui-common/design-system';
import { Box, Button, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './summary.scss';
import { useNavigate } from 'react-router-dom';

export function Summary() {
  const navigate = useNavigate();
  const { state, setState } = useSharedState();
  const { handleSubmit, control, setValue, watch, getValues } = useForm<CaptureState>({
    defaultValues: defaultCaptureState,
    mode: 'onBlur',
  });

  const { mutate: saveMocks } = useMutation({
    mutationFn: (formData: any) => meAxiosClient.post('/api/mock/mocks', formData),
    onSuccess: res => {
      console.log(res);
      navigate('/dashboard');
    },
    onError: err => {
      console.log(err);
    },
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

  useEffect(() => {
    refetchSpaces();
  }, [refetchSpaces]);

  const onSubmit = async (data: CaptureState) => {
    console.log('saved');
    saveMocks({
      groupId: data.group,
      space: data.space,
      list: state.captureState?.mocks,
    });
  };

  return (
    <Box className="summary-container">
      <Typography sx={{ fontSize: '2rem', marginBlockEnd: '0.5rem' }} noWrap>
        Summary
      </Typography>
      <Box className="summary-form">
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

      <Button onClick={handleSubmit(onSubmit)} variant={'contained'} sx={{}}>
        Save
      </Button>
    </Box>
  );
}

export default Summary;
