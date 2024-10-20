import { Box, Button, Modal, Typography } from '@mui/material';
import styles from './group-modal.module.scss';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createGroup, fetchGroup, updateGroup } from '../util/http';
import { queryClient } from '@ui-tanstack/common';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '75%',
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

  const { id } = useParams();
  const isCreateMode = id === 'NEW';

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['event', { id: id }],
    queryFn: ({ signal, queryKey }) => fetchGroup({ signal, id }),
    enabled: id !== undefined && id !== 'NEW',
  });

  function handleClose() {
    navigate('../' + location.search);
  }

  useEffect(() => {
    if (data) {
      setFormData({
        _id: data._id,
        name: data.name,
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
    mutationFn: ({ formData }) => (isCreateMode ? createGroup({ formData }) : updateGroup({ formData })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', 'search'], exact: true });
      handleClose();
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Form data:', formData);
    setFormData(formData);
    mutate({ formData: formData });
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <div className={styles['group-modal-content']}>
          <div className={styles['group-modal-header']}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <span>{isCreateMode ? 'Create' : 'Update'} Group</span>
            </Typography>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </div>
          <div className={styles['group-modal-body']}>
            <div className="form-control">
              <label className="block text-white font-bold" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
        </div>
        <div className={styles['group-modal-footer']}>
          <Button variant="outlined" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default GroupModal;
