import './mock-modal.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createMock, fetchMock } from '@ui-tanstack/common';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height: '75%',
  border: '1px solid #000',
  p: 4,
};

export function MockModal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isCreateMode = id === 'NEW';

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    value: '',
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal, queryKey }) => fetchMock({ signal, id }),
    enabled: id !== undefined && id !== 'NEW',
  });

  function handleClose() {
    navigate(-1);
  }

  useEffect(() => {
    if (data) {
      setFormData({
        id: data._id,
        name: data.name,
        value: JSON.stringify(data.value, null, 2),
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
    mutationFn: ({ formData }) => createMock({ formData }),
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Form data:', formData);
    setFormData(formData);
    mutate({ formData: formData });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="bg-slate-800 flex w-full">
        <form onSubmit={handleSubmit} className="shadow-md rounded p-5 w-full flex flex-col gap-4">
          {!isCreateMode && (
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="id">
                ID:
              </label>
              <input
                type="text"
                id="id"
                name="id"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.id}
                onChange={handleInputChange}
                disabled={!isCreateMode}
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="value">
              JSON Data:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y h-32"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Box>
    </Modal>
  );
}

export default MockModal;
