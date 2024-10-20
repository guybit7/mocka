import { useEffect, useState } from 'react';
import styles from './groups-header.module.scss';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@mui/material';

export function GroupsHeader() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const debounced = useDebouncedCallback((value: any) => {
    setSearchTerm(value);
    setSearchParams({ search: value });
    navigate(`?search=${value}`);
  }, 300);

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, []);

  const addGroup = () => {
    navigate('./list/NEW' + location.search);
  };

  return (
    <div className={styles['groups-header-container']}>
      <div className={styles['gh-search-container']}>
        <input
          type="search"
          className="input"
          defaultValue={searchTerm || ''}
          placeholder="Search item"
          onChange={e => debounced(e.target.value)}
        />
      </div>
      <div className={styles['gh-actions-container']}>
        <Button variant="outlined" onClick={addGroup}>
          Add Group
        </Button>
      </div>
    </div>
  );
}

export default GroupsHeader;
