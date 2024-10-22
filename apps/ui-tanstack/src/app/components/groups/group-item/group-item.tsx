import { Button } from '@mui/material';
import styles from './group-item.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export function GroupItem({ row, onDelete, onSelect }) {
  const navigate = useNavigate();
  const location = useLocation();

  const editGroup = () => {
    navigate(`./${row._id}` + location.search);
  };

  const mockList = () => {
    onSelect(row);
  };

  const deleteGroup = () => {
    onDelete(row);
  };

  return (
    <div className={styles['group-item-container']}>
      <div className={styles['gi-action-container']}>
        <Button variant="outlined" onClick={deleteGroup}>
          Delete
        </Button>
        <Button variant="outlined" onClick={editGroup}>
          Edit
        </Button>
        <Button variant="outlined" onClick={mockList}>
          Mock List
        </Button>
      </div>

      <span className={styles['group-item__name']}>{row.name}</span>

      <span className={styles['group-item__id']}>{row._id}</span>
    </div>
  );
}

export default GroupItem;
