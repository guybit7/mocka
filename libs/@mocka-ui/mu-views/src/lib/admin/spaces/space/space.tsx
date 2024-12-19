import { MuFormTextField, MuModal } from '@mockoto-ui-common/design-system';
import { MuModalFooterCommonActions } from '@mockoto-ui-common/ui-components';
import { muAxiosClient, muQueryClient } from '@mu/mu-auth';
import { Box, CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './space.scss';
import { useForm } from 'react-hook-form';

interface SpaceFormData {
  name: string;
  _id: string;
}
const defaultValues = {
  name: '',
  _id: '',
};

export function Space() {
  const navigate = useNavigate();
  const { handleSubmit, control, setValue, reset } = useForm<SpaceFormData>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });
  const { id } = useParams();
  const isCreateMode = id === 'NEW';

  const { mutate: spaceMutate } = useMutation({
    mutationFn: (formData: SpaceFormData) =>
      isCreateMode ? muAxiosClient.post('/api/space', formData) : muAxiosClient.put('/api/space', formData),
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['spaces'] });
      handleClose();
    },
  });

  const { mutate: spaceDeleteMutate } = useMutation({
    mutationFn: () => muAxiosClient.delete(`/api/space/${id}`),
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['spaces'] });
      handleClose();
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['space'],
    queryFn: ({ signal, queryKey }) => muAxiosClient.get<any, any>(`/api/space/${id}`, { signal }),
    enabled: id !== undefined && id !== 'NEW',
  });

  useEffect(() => {
    if (data) {
      // Set the form field values when data is available
      setValue('name', data.name); // Example: setting the 'name' field with data
    }
  }, [data, setValue]); // Runs every time data changes

  const handleClose = () => {
    navigate('../');
  };

  useEffect(() => {
    if (isCreateMode) {
      reset(defaultValues);
    }
  }, [isCreateMode, reset]);

  const handleDelete = () => {
    if (!isCreateMode) {
      spaceDeleteMutate();
    }
  };

  const onSubmit = async (data: any) => {
    console.log('Form data:', data.name);
    if (data.name?.trim()?.length === 0) {
      return;
    }
    if (!isCreateMode) {
      data._id = id;
    }
    spaceMutate(data);
  };

  return (
    <MuModal
      open={true}
      onClose={handleClose}
      header={
        <span>
          {isCreateMode ? 'Create' : 'Update'} <span>&nbsp;Space</span>
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
            <MuFormTextField id="name" name="name" control={control} rules={{ required: 'Required' }} label="Name" />
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

export default Space;
