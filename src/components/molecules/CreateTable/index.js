import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

const StyledTableRow = styled(TableRow)((props) => {
  const { theme, disabled } = props;
  return {
    ...(disabled && {
      backgroundColor: theme.palette.grey[300],
      td: {
        color: theme.palette.grey[400],
      },
    }),
  };
});

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function CreateTable({ heads, rows, size = 'small', pagination = {} }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

  if (rows.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          opacity: '0.5',
        }}
      >
        <Typography variant="h4">No Data Found</Typography>
      </Box>
    );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <React.Fragment>
      <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table" size={size}>
          <TableHead>
            <TableRow>
              {heads.map((column) => (
                <TableCell
                  sx={{
                    minWidth: column.minWidth,
                  }}
                  key={column.label}
                  align={column.align}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row) => {
              const isDisabled = row.isLocked ?? row.isDisable;
              return (
                <StyledTableRow hover tabIndex={-1} key={row._id} disabled={isDisabled}>
                  {heads.map((column) => {
                    let value = row;
                    const colm = column.id ? column.id.split('.') : row;
                    if (column.id && Object.prototype.hasOwnProperty.call(row, colm[0])) {
                      value = colm.reduce((acc, itm) => acc[itm], { ...row });
                    }
                    if (!value) return <TableCell />;

                    return (
                      <TableCell
                        key={`${row._id}-${column.id}`}
                        align={column.align}
                        scope="row"
                        disabled={isDisabled}
                      >
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {Object.keys(pagination).length !== 0 && (
        <TablePagination
          rowsPerPageOptions={pagination.rowsPerPage}
          component="div"
          count={pagination.total}
          rowsPerPage={pagination.limit}
          page={pagination.currentPage}
          onPageChange={() => {}}
          onRowsPerPageChange={(e) => {
            pagination.setItemPerPage(e.target.value);
          }}
          nextIconButtonProps={{
            onClick: pagination.next,
          }}
          backIconButtonProps={{
            onClick: pagination.prev,
          }}
        />
      )}
    </React.Fragment>
  );
}

CreateTable.defaultProps = {
  heads: [],
  rows: [],
};

export default CreateTable;
