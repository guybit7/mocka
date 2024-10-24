import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './space-form.module.scss';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createSpace, fetchSpace, updateSpace } from '../util/http';
import { queryClient } from '@ui-tanstack/common';
import { Button } from '@mui/material';

export function SpaceForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const isCreateMode = id === 'NEW';

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['space', { id: id }],
    queryFn: ({ signal, queryKey }) => fetchSpace({ signal, id }),
    enabled: id !== undefined && id !== 'NEW',
  });

  function handleClose() {
    navigate('../' + location.search);
  }

  useEffect(() => {
    if (id === 'NEW') {
      setFormData({
        _id: '',
        name: '',
      });
    }
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
    mutationFn: ({ formData }) => (isCreateMode ? createSpace({ formData }) : updateSpace({ formData })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spaces', 'search'], exact: true });
      handleClose();
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Form data:', formData);
    if (formData.name?.trim()?.length === 0) {
      return;
    }
    setFormData(formData);
    mutate({ formData: formData });
  };

  return (
    <div className={styles['space-form-container']}>
      <div className="form-control">
        <label className="block text-white font-bold" htmlFor="name">
          Space Name
        </label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="input" />
      </div>
      <div className={styles['space-form-footer']}>
        <Button variant="outlined" onClick={handleSubmit}>
          Save
        </Button>

        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default SpaceForm;
