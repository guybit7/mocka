import { useEffect, useState } from 'react';
import styles from './groups-header.module.scss';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useGroupContext } from '../groups-container/groups-container';

export function GroupsHeader() {
  const { summarySpaces, setActiveSpace } = useGroupContext();

  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [space, setSpace] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearch = useDebouncedCallback((value: any) => {
    const params = new URLSearchParams(searchParams);
    params.set('search', value);
    setSearchParams(params);
  }, 300);

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, []);

  useEffect(() => {
    const spaceQuery = searchParams.get('space');
    if (summarySpaces && spaceQuery) {
      const selectedSpace: any = summarySpaces?.find((space: any) => space?._id === spaceQuery);
      if (selectedSpace) {
        setSpace(selectedSpace?._id);
        setTheActiveSpace(selectedSpace?._id);
      } else {
        const params = new URLSearchParams(searchParams);
        params.delete('space');
        params.delete('search');
        setSearchParams(params);
        setSpace(null);
      }
    }
  }, [summarySpaces]);

  const addGroup = () => {
    navigate('./list/NEW' + location.search);
  };

  const handleSpaceChange = (event: SelectChangeEvent) => {
    setSpace(event.target.value as string);
    const params = new URLSearchParams(searchParams);
    params.set('space', event.target.value);
    params.delete('search');
    setSearchTerm('');
    setSearchParams(params);
    setTheActiveSpace(event.target.value);
  };

  const setTheActiveSpace = (id: string) => {
    const spaceItem = summarySpaces.find((space: any) => space._id === id);
    if (spaceItem) {
      setActiveSpace(spaceItem);
    }
  };

  return (
    <div className={styles['groups-header-container']}>
      <div className={styles['gh-search-container']}>
        <Paper component="form" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
          <FormControl fullWidth size="small">
            <InputLabel id="space-select">Space</InputLabel>
            <Select
              id="space-select"
              placeholder="Select Space"
              value={space}
              label="Space"
              onChange={handleSpaceChange}
            >
              {summarySpaces?.map((space: any) => {
                return <MenuItem value={space._id}>{space.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <div style={{ display: 'flex' }}>
              <TextField
                disabled={space === null}
                size="small"
                placeholder="Search Groups"
                inputProps={{ 'aria-label': 'search groups' }}
                defaultValue={searchTerm}
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  debouncedSearch(e.target.value);
                }}
              />
              <IconButton type="button" aria-label="search" disabled={space === null}>
                <SearchIcon />
              </IconButton>
            </div>
          </FormControl>
        </Paper>
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
