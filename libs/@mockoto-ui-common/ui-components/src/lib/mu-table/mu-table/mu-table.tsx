import { FilterMetadata, LazyLoadMeta } from '@mockoto-ui-common/types';
import { globalSearch } from '@mockoto-ui-common/utils';
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React, { useEffect, useRef, useState } from 'react';
import { MuTableActionEvent, MuTableHeaderItem } from '../interfaces/mu-table-header-item.interface';
import './mu-table.scss';
import { MuTableHeaderType } from '../enums';

type Order = 'asc' | 'desc';

interface MuTableProps {
  id: string;
  dataSource: [];
  headers: MuTableHeaderItem[];
  sx?: React.CSSProperties;
  order: Order;
  orderBy: string;
  rowCount: number;
  onLazyLoadMetaChange: (meta: LazyLoadMeta) => void;
  children?: React.ReactNode;
  onRowClick?: (row: any) => void;
  onActionClick?: (muTableActionEvent: MuTableActionEvent) => void;
}

export const MuTable: React.FC<MuTableProps> = ({
  dataSource,
  sx = {},
  headers,
  id,
  order,
  orderBy,
  children,
  onLazyLoadMetaChange,
  onRowClick,
  onActionClick,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<number>(1); // 1 for ascending, -1 for descending
  const [filters, setFilters] = useState<{ [key: string]: FilterMetadata }>({});
  const [globalFilter, setGlobalFilter] = useState<string>(''); // For global search input
  const [filteredData, setFilteredData] = useState<[]>([]);
  const [isLoading, setLoading] = useState(false);

  // Ref to store the previous lazy load metadata
  const prevMetaRef = useRef<LazyLoadMeta | null>(null);

  // Slice the data according to pagination settings
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page to 0 when rows per page changes
  };

  // Effect to notify parent about meta changes
  useEffect(() => {
    const meta: LazyLoadMeta = {
      first: page * rowsPerPage,
      rows: rowsPerPage,
      sortField: sortField,
      sortOrder: sortOrder,
      filters,
      globalFilter,
    };
    // Only call onLazyLoadMetaChange if the meta has changed
    if (JSON.stringify(meta) !== JSON.stringify(prevMetaRef.current)) {
      if (
        prevMetaRef.current === null ||
        (meta.first === prevMetaRef.current?.first && meta.rows === prevMetaRef.current?.rows) ||
        meta.globalFilter !== prevMetaRef.current.globalFilter
      ) {
        // onLazyLoadMetaChange(meta); // Send the metadata to the parent
        applyFilter(meta);
      }
    }
  }, [dataSource, page, rowsPerPage, sortField, sortOrder, filters, globalFilter, onLazyLoadMetaChange]); // Dependency array ensures it's called on changes

  useEffect(() => {
    if (prevMetaRef.current) {
      handleClearGlobalFilter();
      applyFilter(prevMetaRef.current);
    }
  }, [dataSource]);

  const applyFilter = (lazyLoadMeta: LazyLoadMeta) => {
    const globalFilter = lazyLoadMeta.globalFilter ?? '';
    const finalData: any = globalSearch(dataSource, globalFilter, sortField, sortOrder);
    setLoading(true);
    setPage(0); // Reset page to 0 when rows per page changes
    // setTimeout(() => {
    setFilteredData(finalData); // Set the filtered data
    setLoading(false);
    prevMetaRef.current = lazyLoadMeta; // Update the ref with the latest metadata
    // }, 300);
  };

  const handleSortChange = (field: string) => {
    const newSortOrder = sortField === field && sortOrder === 1 ? -1 : 1; // Toggle between asc and desc
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value);
  };

  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row); // Trigger the callback passed from the parent component
    }
  };

  const handleClearGlobalFilter = () => {
    setGlobalFilter(''); // Clear the global filter input
  };

  function handleIconActionClick(header: MuTableHeaderItem, row: any) {
    if (onActionClick) {
      const muTableActionEvent: MuTableActionEvent = {
        id: header.id,
        type: header.type,
        row,
      };
      onActionClick(muTableActionEvent);
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: '1', padding: 1 }}>
      <Box sx={{ paddingBlock: 2, display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
        <TextField
          label="Global Search"
          variant="outlined"
          fullWidth
          size="small"
          value={globalFilter}
          onChange={handleGlobalFilterChange}
          sx={{ width: '15rem', minWidth: '10rem' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {globalFilter && (
                  <span style={{ cursor: 'pointer', fontSize: '16px' }} onClick={handleClearGlobalFilter}>
                    &#10005;
                  </span>
                )}
              </InputAdornment>
            ),
          }}
        />
        {children}
      </Box>
      <TableContainer
        sx={{
          height: '100%',
        }}
      >
        <Table stickyHeader aria-label={`aria-${id}`} id={`mu-table-${id}`} size={'small'}>
          <TableHead>
            <TableRow id={`header-row`}>
              {/* actions */}
              {headers &&
                headers
                  .filter(h => h.type === MuTableHeaderType.ICON)
                  .map(header => (
                    <TableCell
                      id={`cell-${id}`}
                      key={header.field}
                      align={'left'}
                      padding={'none'}
                      sortDirection={orderBy === header.field ? order : false}
                    ></TableCell>
                  ))}
              {/* header */}
              {headers &&
                headers
                  .filter(h => h.type !== MuTableHeaderType.ICON)
                  .map(header => (
                    <TableCell
                      id={`cell-${id}`}
                      key={header.field}
                      align={'left'}
                      padding={'none'}
                      sortDirection={orderBy === header.field ? order : false}
                    >
                      <TableSortLabel
                        active={sortField === header.field}
                        direction={sortField === header.field ? (sortOrder === 1 ? 'asc' : 'desc') : 'asc'}
                        onClick={() => handleSortChange(header.field!)}
                      >
                        {header.label}
                        {orderBy === header.field ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
            </TableRow>
          </TableHead>

          <TableBody id={`table-body`}>
            {isLoading && (
              <TableRow sx={{ height: '100%' }}>
                <TableCell colSpan={headers.length} align="center" sx={{ height: '100%' }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {/* Display message when no data is found */}
            {!isLoading && paginatedData.length === 0 && (
              <TableRow sx={{ height: '100%' }}>
                <TableCell colSpan={headers.length} align="center" sx={{ height: '100%' }}>
                  <span>Not found data</span>
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              paginatedData.length > 0 &&
              paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'var(--me-row-hover)', // Hover effect
                      cursor: 'pointer', // Change cursor to pointer on hover
                    },
                  }}
                  onClick={() => handleRowClick(row)} // Handle row click
                >
                  {headers
                    .filter(h => h.type !== MuTableHeaderType.TEXT)
                    .map((header: MuTableHeaderItem) => (
                      <TableCell
                        sx={{
                          '&:hover': {
                            backgroundColor: 'unset',
                            cursor: 'pointer',
                          },
                        }}
                        key={header.field}
                        id={`cell-${id}-${header.field}`}
                      >
                        {header.action?.icon && (
                          <Tooltip title={header.action?.name || 'Action'} arrow placement="top">
                            {React.createElement(header.action.icon, {
                              onClick: (e: React.MouseEvent) => {
                                e.stopPropagation();
                                handleIconActionClick(header, row);
                              },
                              className: 'action-icon',
                            })}
                          </Tooltip>
                        )}
                      </TableCell>
                    ))}
                  {headers
                    .filter(h => h.type !== MuTableHeaderType.ICON)
                    .map(header => (
                      <TableCell key={header.field} id={`cell-${id}-${header.field}`}>
                        {row[header.field!]}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          overflow: 'hidden',
        }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MuTable;
