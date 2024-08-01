import { memo } from 'react';
import ListItem from '../list-item/list-item';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import { NEW } from '../../constants/common.constant';
import { useList } from './list.hook';
import { useMock } from '../mock/mock.hook';

type ListContainerProps = {};

const List = memo<ListContainerProps>(function List() {
  const { loading, theList } = useList();
  const { loadingMock, deleteMock } = useMock();
  const navigate = useNavigate();
  function onCreate() {
    navigate(NEW, { relative: 'path' });
  }

  function onEditItem(item: any) {
    navigate(item._id, { relative: 'path' });
  }

  async function onDeleteItem(id: any) {
    try {
      const res = await deleteMock({ id: id });
    } catch (e) {
      console.error('delete failed');
    }
  }

  return (
    <div className="h-full border-gray-950 border-2 p-2 flex flex-col gap-2">
      <div className="h-8">

      </div>
      <div className="flex flex-col gap-y-1 h-full overflow-auto">
        {loading ? (
          <div> LOADING </div>
        ) : (
          <div>
            {theList.map((item: any, index: number) => {
              return (
                <ListItem
                  item={item}
                  key={item.name + `-${index}`}
                  edit={onEditItem}
                  delete={onDeleteItem}
                ></ListItem>
              );
            })}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
});

export default List;
