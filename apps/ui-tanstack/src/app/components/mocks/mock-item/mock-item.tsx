import { useLocation, useNavigate } from 'react-router-dom';
import styles from './mock-item.module.scss';
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

 return (
   <div className={styles['item-container']}>
     <div className={styles['action-container']}>
       <Button variant="outlined" onClick={deleteGroup}>
         View
       </Button>
       <Button variant="outlined" onClick={deleteGroup}>
         Delete
       </Button>
       <Button variant="outlined" onClick={editGroup}>
         Edit
       </Button>
     </div>

     <span className={styles['item__name']}>{row.name}</span>

     <span className={styles['item__id']}>{row._id}</span>
   </div>
 );
}

export default MockItem;
