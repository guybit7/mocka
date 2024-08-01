import { useQuery } from '@tanstack/react-query';
import './mocks-list.scss';
import { fetchMocks } from '@ui-tanstack/common';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TableHead } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import Button from '@mui/material/Button';

export function MocksList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>();

  let content = <p>Plesae enter a search term and to find items</p>;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchMocks({ signal, ...queryKey[1] }),
    enabled: searchTerm !== undefined,
  });

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [])

  const debounced = useDebouncedCallback((value: any) => {
    setSearchTerm(value);
    setSearchParams({ search: value });
    navigate(`?search=${value}`);
  }, 300);

  function handleRowClick(row: any) {
    navigate(`./${row._id}`);
  }

  function handleNewItem() {
    navigate(`./NEW`);
  }

  if (isError) {
    content = <p>Error</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (data) {
    content = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeader}>Name</TableCell>
              <TableCell sx={tableHeader}>id</TableCell>
              {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow
                onClick={() => handleRowClick(row)}
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row._id}</TableCell>
                {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
    // content = (
    //   <ul className="events-list">
    //     {data &&
    //       data.map((mock: any, index: number) => (
    //         <li key={`${mock.id$}-${index}`}>
    //           <MockItem data={mock} xxx={index}></MockItem>
    //         </li>
    //       ))}
    //   </ul>
    // );
  }

  return (
    <>
      <div>
        <div id="search-container">
          <h2>Find item </h2>
          <input type="search" className="input" defaultValue={searchTerm || ''} placeholder="Search item" onChange={e => debounced(e.target.value)} />
        </div>
      </div>

      <div id="list-container">
        <div>
          <Button onClick={handleNewItem}>Add New Item</Button>
        </div>
        {content}</div>
      <Outlet></Outlet>
    </>
  );
}

export default MocksList;

const tableHeader = { color: 'red', fontWeight: 'bold' };
