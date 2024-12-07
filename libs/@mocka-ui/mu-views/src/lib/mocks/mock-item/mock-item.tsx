import { useLocation, useNavigate } from 'react-router-dom';
import './mock-item.scss';
import { Button } from '@mui/material';

export function MockItem({ row, onDelete, onSelect }) {
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

  const link = () => {
    window.open(`http://localhost:3000/${row.groupId}/${row.name}`, '_blank'); // Open in a new tab
  };

  return (
    <div className="item-container">
      <div className="action-container">
        <Button variant="outlined" onClick={deleteGroup}>
          Delete
        </Button>
        <Button variant="outlined" onClick={editGroup}>
          Edit
        </Button>
        <Button variant="outlined" onClick={link}>
          Link
        </Button>
      </div>

      <span className="item__name">{row.name}</span>

      <span className="item__id">{row._id}</span>
    </div>
  );
}

export default MockItem;
