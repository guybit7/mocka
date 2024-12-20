import { MuFormTextField, MuModal, MuToggleButton } from '@mockoto-ui-common/design-system';
import { MuModalFooterCommonActions } from '@mockoto-ui-common/ui-components';
import { muAxiosClient, muQueryClient } from '@mu/mu-auth';
import { Box, CircularProgress, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './mock.scss';

interface MockFormData {
  name: string;
  value: string;
  status: string;
}

interface MockFormDataPaylod {
  name: string;
  value: string;
  status: boolean;
  groupId: string | undefined;
}
const defaultValues = {
  name: '',
  value: '',
  status: 'Success',
};

const options: any[] = [
  { value: 'Success', label: 'Success' },
  { value: 'Fail', label: 'Fail' },
];

export function Mock() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { handleSubmit, control, setValue, reset } = useForm<MockFormData>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });
  const { id, groupId } = useParams();
  const isCreateMode = id === 'NEW';

  const { mutate: mockMutate } = useMutation({
    mutationFn: (formData: MockFormDataPaylod) =>
      isCreateMode
        ? muAxiosClient.post('/api/mock', formData)
        : muAxiosClient.put('/api/mock', { ...formData, _id: id }),
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['mocks'] });
      handleClose();
    },
  });

  const { mutate: spaceDeleteMutate } = useMutation({
    mutationFn: () => muAxiosClient.delete(`/api/mock/${id}`),
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['mocks'] });
      handleClose();
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['mock'],
    queryFn: ({ signal, queryKey }) => muAxiosClient.get<any, any>(`/api/mock/${id}`, { signal }),
    enabled: id !== undefined && id !== 'NEW',
  });

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('value', data.value);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (isCreateMode) {
      reset(defaultValues);
    }
  }, [isCreateMode, reset]);

  const handleClose = () => {
    const currentQueryParams = new URLSearchParams(window.location.search);

    navigate('../?' + currentQueryParams);
  };

  const handleDelete = () => {
    if (!isCreateMode) {
      spaceDeleteMutate();
    }
  };

  const onSubmit = async (data: any) => {
    console.log('Form data:', data);
    if (data.name?.trim()?.length === 0) {
      return;
    }
    const formData: MockFormDataPaylod = {
      name: data.name,
      value: data.value,
      status: data.status === 'Success',
      groupId: groupId,
    };
    mockMutate(formData);
  };

  return (
    <MuModal
      open={true}
      onClose={handleClose}
      minWidth="50%"
      minHeight="75%"
      header={
        <span>
          {isCreateMode ? 'Create' : 'Update'} <span>&nbsp;Mock</span>
        </span>
      }
      children={
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!isLoading && (
            <>
              <MuFormTextField
                id="name"
                name="name"
                control={control}
                rules={{ required: 'Required' }}
                label="Endpoint"
              />

              <MuToggleButton
                name="status"
                control={control}
                options={options}
                label="Status"
                exclusive={true}
                id={'status'}
              />

              <MuFormTextField
                id="value"
                name="value"
                multiline={true}
                rows={15}
                control={control}
                rules={{ required: 'Required' }}
                label="Value"
              />
            </>
          )}
        </Box>
      }
      footer={
        <MuModalFooterCommonActions
          onSave={handleSubmit(onSubmit)}
          onClose={handleClose}
          showDelete={!isCreateMode}
          onDelete={handleDelete}
        />
      }
    />
  );
}
export default Mock;
