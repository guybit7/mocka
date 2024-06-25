import styles from './list-item.module.scss';
import Button from '@mui/material/Button';
import { useState } from 'react';

export function ListItem(props: any) {
  const [item] = useState(props.item);

  function onEdit() {
    props.edit(item);
  }

  function onDelete() {
    props.delete(item._id);
  }

  return (
    <div className='flex flex-row border-black border-2 gap-5 py-1'>
      <div className='flex flex-row justify-center items-center px-1 gap-1'>
        <Button variant="contained" onClick={onEdit} className='h-8'>Edit</Button>
        <Button variant="contained" onClick={onDelete} className='h-8'>Delete</Button>
      </div>
      <label className='w-36'>
        {item.name}
      </label>
      <label>
        {JSON.stringify(item.value)}
      </label>
    </div>
  );
}

export default ListItem;
