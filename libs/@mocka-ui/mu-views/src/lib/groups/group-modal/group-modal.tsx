import './group-modal.scss';
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useGroupContext } from '../groups-container/groups-container';
import { muAxiosClient, muQueryClient } from '@mu/mu-auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40rem',
  height: '20rem',
  border: '1px solid #000',
  p: 2,
  background: '#1e293b',
  display: 'flex',
  flexDirection: 'column',
};

export function GroupModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { activeSpace } = useGroupContext();

  const { id } = useParams();
  const isCreateMode = id === 'NEW';

  const [formData, setFormData] = useState({
    name: '',
    spaceId: '',
  } as { _id?: string; name: string; spaceId: string });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['event', { id: id }],
    queryFn: ({ signal, queryKey }) => muAxiosClient.get<any, any>(`/api/group/${id}`, { signal }),
    enabled: id !== undefined && id !== 'NEW',
  });

  const { mutate } = useMutation({
    mutationFn: ({ formData }) =>
      isCreateMode ? muAxiosClient.post('/api/group', formData) : muAxiosClient.put('/api/group', formData),
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['groups', searchParams.get('search')], exact: true });
      handleClose();
    },
  });

  function handleClose() {
    navigate('../' + location.search);
  }

  useEffect(() => {
    if (data) {
      setFormData({
        _id: data._id,
        name: data.name,
        spaceId: data.spaceId,
      });
    }
  }, [data]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (activeSpace) {
      formData.spaceId = activeSpace._id;
      mutate({ formData: formData });
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <div className="group-modal-content">
          <div className="group-modal-header">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <span>{isCreateMode ? 'Create' : 'Update'} Group</span>
            </Typography>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </div>
          <div className="group-modal-body">
            <span>Space Details: {activeSpace?.name}</span>
            <div className="group-modal-body__controls">
              <FormControl fullWidth size="small">
                <TextField
                  size="small"
                  label="Name"
                  placeholder="Name"
                  name="name"
                  inputProps={{ 'aria-label': 'search groups' }}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>
          </div>
        </div>
        <div className="group-modal-footer">
          <Button variant="outlined" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default GroupModal;
