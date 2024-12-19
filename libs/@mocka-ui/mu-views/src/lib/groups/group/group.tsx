import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './group.scss';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { muAxiosClient, muQueryClient } from '@mu/mu-auth';
import { useEffect } from 'react';
import { MuFormTextField, MuModal } from '@mockoto-ui-common/design-system';
import { Box, CircularProgress } from '@mui/material';
import { MuModalFooterCommonActions } from '@mockoto-ui-common/ui-components';

interface GroupFormData {
  name: string;
}
const defaultValues = {
  name: '',
};

export function Group() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { handleSubmit, control, setValue, reset } = useForm<GroupFormData>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });
  const { id } = useParams();
  const isCreateMode = id === 'NEW';

  const { mutate: groupMutate } = useMutation({
    mutationFn: (formData: GroupFormData) =>
      isCreateMode
        ? muAxiosClient.post('/api/group', formData)
        : muAxiosClient.put('/api/group', { ...formData, _id: id }),
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['groups'] });
      handleClose();
    },
  });

  const { mutate: spaceDeleteMutate } = useMutation({
    mutationFn: () => muAxiosClient.delete(`/api/group/${id}`),
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['groups'] });
      handleClose();
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['group'],
    queryFn: ({ signal, queryKey }) => muAxiosClient.get<any, any>(`/api/group/${id}`, { signal }),
    enabled: id !== undefined && id !== 'NEW',
  });

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
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
    console.log('Form data:', data.name);
    if (data.name?.trim()?.length === 0) {
      return;
    }
    const formData = {
      name: data.name,
      spaceId: searchParams.get('space'),
    };
    groupMutate(formData);
  };

  return (
    <MuModal
      open={true}
      onClose={handleClose}
      header={
        <span>
          {isCreateMode ? 'Create' : 'Update'} <span>&nbsp;Group</span>
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

export default Group;
