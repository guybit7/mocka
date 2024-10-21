import { useLocation, useNavigate } from 'react-router-dom';
import styles from './space-item.module.scss';
import { Button } from '@mui/material';

export function SpaceItem({ row, onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();

  const edit = () => {
    navigate(`./${row._id}` + location.search);
  };

  const deleteItem = () => {
    onDelete(row);
  };

  return (
    <div className={styles['item-container']}>
      <div className={styles['item-action-container']}>
        <Button variant="outlined" onClick={deleteItem}>
          Delete
        </Button>
        <Button variant="outlined" onClick={edit}>
          Edit
        </Button>
      </div>

      <span className={styles['item__name']}>{row.name}</span>

      <span className={styles['item__id']}>{row._id}</span>
    </div>
  );
}

export default SpaceItem;
