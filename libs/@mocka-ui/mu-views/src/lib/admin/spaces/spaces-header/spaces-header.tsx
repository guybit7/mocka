import './spaces-header.scss';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function SpacesHeader() {
  const navigate = useNavigate();
  const addSpace = () => {
    navigate('./list/NEW');
  };

  return (
    <div className="spaces-header-container">
      <div className="sh-actions-container">
        <Button variant="outlined" onClick={addSpace}>
          Add Space
        </Button>
      </div>
    </div>
  );
}

export default SpacesHeader;
