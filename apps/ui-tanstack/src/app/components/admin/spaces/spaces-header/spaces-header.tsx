import { Button } from '@mui/material';
import styles from './spaces-header.module.scss';
import { useNavigate } from 'react-router-dom';

export function SpacesHeader() {
  const navigate = useNavigate();
  const addSpace = () => {
    navigate('./list/NEW');
  };

  return (
    <div className={styles['spaces-header-container']}>
      <div className={styles['sh-actions-container']}>
        <Button variant="outlined" onClick={addSpace}>
          Add Space
        </Button>
      </div>
    </div>
  );
}

export default SpacesHeader;
