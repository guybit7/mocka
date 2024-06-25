import { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from '../list-item/list-item';
import Button from '@mui/material/Button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { NEW } from '../../constants/common.constant';
// import crypto from 'crypto';

export function List() {
  const [items, setItems] = useState([] as any[]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetchAll();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [location]);

  async function fetchAll() {
    try {
      const reponse = await axios.get('http://localhost:3000/mock/getAll');
      const theNewRes: any = [...reponse.data];
      setItems(theNewRes);
    } catch (error) {
      throw Error('fetch all failed');
    }
  }

  function editItem(item: any) {
    console.log(item);
    navigate(item._id, { relative: 'path' });
  }

  function onCreate() {
    navigate(NEW, { relative: 'path' });
  }

  async function onDelete(id: any) {
    try {
      const response = await axios.delete('http://localhost:3000/mock', {
        data: { id: id },
      });
      fetchAll();
    } catch (error) {
      console.log('delete failed');
    }
  }

  function createSHA256Hash(inputString: any) {
    // const hash = crypto.createHash('sha256');
    // hash.update(inputString);
    // return hash.digest('hex');
  }

  return (
    <div className="h-full border-gray-950 border-2 p-2 flex flex-col gap-2">
      <div className="h-8">
        <Button variant="outlined" onClick={onCreate} className="h-8">
          Create
        </Button>
      </div>
      <div className="flex flex-col gap-y-1 h-full overflow-auto">
        {items.map((item, index) => {
          return (
            <ListItem
              item={item}
              key={item.name}
              edit={editItem}
              delete={onDelete}
            ></ListItem>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}

export default List;
