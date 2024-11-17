import './space-form.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, FormControl, TextField } from '@mui/material';
import { muAxiosClient, muQueryClient } from '@mu/mu-auth';

export function SpaceForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const isCreateMode = id === 'NEW';

  const [formData, setFormData] = useState({
    name: '',
  } as { _id?: string; name: string });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['space', { id: id }],
    queryFn: ({ signal, queryKey }) =>
      muAxiosClient.get<any, { _id: string; name: string }>(`api/space/${id}`, { signal }),
    enabled: id !== undefined && id !== 'NEW',
  });

  function handleClose() {
    navigate('../' + location.search);
  }

  useEffect(() => {
    if (id === 'NEW') {
      setFormData({
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

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: ({ formData }: any) => {
      if (isCreateMode) {
        return muAxiosClient.post('api/space', formData);
      } else {
        return muAxiosClient.put('api/space', formData);
      }
    },
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['spaces', 'search'], exact: true });
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
    <div className="space-form-container">
      <div className="form-control">
        <FormControl fullWidth>
          <TextField
            name="name"
            value={formData.name}
            id="space-name"
            label="Space Name"
            variant="outlined"
            onChange={handleInputChange}
          />
        </FormControl>
      </div>
      <div className="space-form-footer">
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>

        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default SpaceForm;
