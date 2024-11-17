import { Button, FormControl, IconButton, Paper, TextField } from '@mui/material';
import './mocks-header.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useMocksContext } from '../mocks-container/mocks-container';

export function MocksHeader() {
  const { activeGroup } = useMocksContext();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const debouncedSearch = useDebouncedCallback((value: any) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams);
    params.set('search', value);
    setSearchParams(params);
  }, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
  }, []);

  const addGroup = () => {
    navigate('./list/NEW' + location.search);
  };

  return (
    <div className="header-container">
      <div className="group-details">
        <span className="group-details__title">{activeGroup?.name}</span>
        <span className="group-details__id">{activeGroup?._id}</span>
      </div>
      <div className="search-container">
        <Paper component="form" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FormControl fullWidth size="small">
            <div style={{ display: 'flex' }}>
              <TextField
                size="small"
                placeholder="Search Mock"
                inputProps={{ 'aria-label': 'search mock' }}
                defaultValue={searchTerm}
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  debouncedSearch(e.target.value);
                }}
              />
              <IconButton type="button" aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
          </FormControl>
        </Paper>
      </div>
      <div className="actions-container">
        <Button variant="outlined" onClick={addGroup}>
          Add Mock
        </Button>
      </div>
    </div>
  );
}

export default MocksHeader;
