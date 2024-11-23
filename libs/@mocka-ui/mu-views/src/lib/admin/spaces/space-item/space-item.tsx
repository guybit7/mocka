import { useLocation, useNavigate } from 'react-router-dom';
import './space-item.scss';
import { Button } from '@mui/material';

export function SpaceItem({ row, onDelete }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  const edit = () => {
    navigate(`./${row._id}` + location.search);
  };

  const deleteItem = () => {
    onDelete(row);
  };

  return (
    <div className="item-container">
      <div className="item-action-container">
        <Button variant="outlined" onClick={deleteItem}>
          Delete
        </Button>
        <Button variant="outlined" onClick={edit}>
          Edit
        </Button>
      </div>

      <span className="item__name">{row.name}</span>

      <span className="item__id">{row._id}</span>
    </div>
  );
}

export default SpaceItem;
