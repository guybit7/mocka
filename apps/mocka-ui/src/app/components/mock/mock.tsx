import { Box, Button, TextField } from '@mui/material';
import styles from './mock.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Modal from '@mui/material/Modal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EntityModeEnum } from '../../enums/entityModeEnum';
import { NEW } from '../../constants/common.constant';
import { useList } from '../list/list.hook';
import { useMock } from './mock.hook';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Mock() {
  const { loadingMock, createMock, updateMock } = useMock();

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [formData, setFormData] = useState({
    name: '',
    value: '',
  });

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const [entityMode, setEntityMode] = useState(EntityModeEnum.CREATE);

  useEffect(() => {
    initEntityMode();
  }, []);

  useEffect(() => {
    initMockState();
  }, [entityMode]);

  function initEntityMode() {
    setEntityMode(params.id === NEW ? EntityModeEnum.CREATE : EntityModeEnum.UPDATE);
  }

  async function initMockState() {
    if (entityMode === EntityModeEnum.UPDATE) {
      try {
        const theMock = await axios.get(`http://localhost:3000/mock/${params.id}`);
        if (theMock === null) {
          console.log(`mock id: ${params.id} not found`);
          handleClose();
        }
        setFormData(theMock.data);
      } catch (error) {
        console.log(error);
        handleClose();
      }
    }
  }

  const handleClose = () => {
    navigate('../', { relative: 'path' });
    setOpen(false);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(formData);
    try {
      let reponse = null;
      switch (entityMode) {
        case EntityModeEnum.CREATE:
          reponse = await createMock(formData);
          break;
        case EntityModeEnum.UPDATE:
          reponse = await updateMock(formData);
          break;
        default: {
          throw new Error('missing entity mode');
        }
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-red-400">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full p-5 h-full">
            <div className="flex flex-col gap-5 h-full">
              {entityMode}
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                name="name"
                className="w-60"
                value={formData.name}
                onChange={handleChange}
              ></TextField>
              <TextareaAutosize
                id="value"
                placeholder="Json"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className="bg-green-300"
              ></TextareaAutosize>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Mock;
