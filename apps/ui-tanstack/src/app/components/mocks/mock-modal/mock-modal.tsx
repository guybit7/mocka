import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './mock-modal.module.scss';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createMock, fetchMock, updateMock } from '../util/http';
import { queryClient } from '@ui-tanstack/common';
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material';
import { useMocksContext } from '../mocks-container/mocks-container';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height: '95%',
  border: '1px solid #000',
  p: 2,
  background: '#1e293b',
  display: 'flex',
  flexDirection: 'column',
};

export function MockModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { activeGroup } = useMocksContext();
  const { id } = useParams();
  const isCreateMode = id === 'NEW';

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    value: '',
    groupId: activeGroup?._id,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['mocks', { id: id }],
    queryFn: ({ signal, queryKey }) => fetchMock({ signal, id }),
    enabled: id !== undefined && id !== 'NEW',
  });

  function handleClose() {
    navigate('../' + location.search);
  }

  useEffect(() => {
    if (data) {
      const jsonObject = JSON.parse(data.value);
      const formattedJson = JSON.stringify(jsonObject, null, 2);

      setFormData({
        _id: data._id,
        name: data.name,
        value: formattedJson,
        groupId: data.groupId,
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

  const { mutate } = useMutation({
    mutationFn: ({ formData }) => (isCreateMode ? createMock({ formData }) : updateMock({ formData })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mocks'], exact: false });
      handleClose();
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isCreateMode) {
      formData.groupId = activeGroup?._id;
    }
    mutate({ formData: formData });
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <div className={styles['modal-content']}>
          <div className={styles['modal-header']}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <span>{isCreateMode ? 'Create' : 'Update'} Mock</span>
            </Typography>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </div>
          <div className={styles['modal-body']}>
            <span>Group Details: {activeGroup?.name}</span>
            <div className={styles['modal-body__controls']}>
              <FormControl fullWidth size="small">
                <TextField
                  size="small"
                  label="Endpoint"
                  placeholder="Endpoint"
                  name="name"
                  inputProps={{ 'aria-label': 'mock' }}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <TextField
                label="JSON Input"
                name="value"
                multiline
                rows={20}
                variant="outlined"
                value={formData.value}
                onChange={handleInputChange}
                fullWidth
                sx={{ whiteSpace: 'pre-wrap' }} // This helps preserve formatting in the TextField
              />
            </div>
          </div>
        </div>
        <div className={styles['modal-footer']}>
          <Button variant="outlined" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default MockModal;
