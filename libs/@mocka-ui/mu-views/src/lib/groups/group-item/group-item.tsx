import './group-item.scss';
import { Button } from '@mui/material';
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
    <div className="group-item-container">
      <div className="gi-action-container">
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

      <span className="group-item__name">{row.name}</span>

      <span className="group-item__id">{row._id}</span>
    </div>
  );
}

export default GroupItem;
