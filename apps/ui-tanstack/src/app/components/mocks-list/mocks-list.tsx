import { useMutation, useQuery } from '@tanstack/react-query';
import './mocks-list.scss';
import { deleteMock, deleteMocks, fetchMocks, queryClient } from '@ui-tanstack/common';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, TableHead } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';

export function MocksList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [dense, setDense] = useState(true);

  let content = <p>Plesae enter a search term and to find items</p>;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { searchTerm: searchParams }],
    queryFn: ({ signal, queryKey }) => {
      console.log(searchTerm);
      return fetchMocks({ signal, searchTerm });
    },
    enabled: searchTerm !== undefined,
  });

  const { mutate: deleteSigleItem } = useMutation({
    mutationFn: ({ row }) => deleteMock({ row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', { searchTerm: searchParams }], exact: true });
    },
  });

  const { mutate: deleteMultipleItems } = useMutation({
    mutationFn: ({ selected }) => deleteMocks({ selected }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', { searchTerm: searchParams }], exact: true });
    },
  });

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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  function handleRowClick(row: any) {
    navigate(`./${row._id}`);
  }

  function handleDeleteRow(row: any) {
    deleteSigleItem({ row });
  }

  function handleNewItem() {
    navigate(`./NEW`);
  }

  function deleteAllSelected() {
    console.log(selected);
    deleteMultipleItems({ selected });
  }

  if (isError) {
    content = <p>Error</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  if (data) {
    content = (
      <TableContainer sx={{ maxHeight: '100%', overflowY: 'hidden' }}>
        <Table stickyHeader aria-label="sticky table" sx={{ Inline: '100px' }} size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...tableHeader }}></TableCell>
              <TableCell sx={{ ...tableHeader, width: '4rem' }}>Actions</TableCell>
              <TableCell sx={tableHeader}>Name</TableCell>
              <TableCell sx={tableHeader}>id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tablebody">
            {data.map((row: any, index: number) => {
              const isItemSelected = isSelected(row._id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  key={row._id}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onClick={event => handleClick(event, row._id)}
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell component="td">
                    <div className="flex gap-4">
                      <Button variant="contained" color="primary" onClick={() => handleRowClick(row)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="primary" onClick={() => handleDeleteRow(row)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell component="td" scope="row" sx={{ color: 'white' }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="left" sx={{ color: 'white' }}>
                    {row._id}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      // <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
    );
  }

  return (
    <div className="mocks-list-container">
      <div className="mocks-list-header">
        <h2>Find item </h2>
        <input
          type="search"
          className="input"
          defaultValue={searchTerm || ''}
          placeholder="Search item"
          onChange={e => debounced(e.target.value)}
        />
      </div>
      <div className="list-container">
        <div className="list-container__actions">
          <Button onClick={handleNewItem} variant="outlined">
            Add New Item
          </Button>
          <Button onClick={deleteAllSelected} variant="outlined">
            Delete All Selected
          </Button>
        </div>
        <Box sx={{ height: '100%', overflow: 'auto' }}>{content}</Box>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default MocksList;

const tableHeader = { color: 'white', fontWeight: 'bold', background: 'black' };
