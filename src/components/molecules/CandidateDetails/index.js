import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import { getSingularPlular } from '@services/global';

function createData(name, value) {
  return { name, value };
}

export default function InterviewDetails({ details }) {
  const { candidate = {} } = details;

  const rows = [
    createData('Name', candidate.name),
    createData('Email', candidate.email),
    createData('Mobile Number', candidate.mobileNumber),
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 9,
          backgroundColor: 'common.white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="div" sx={{ mr: 2, fontSize: '1rem' }}>
            Details
          </Typography>
        </Box>
      </Box>
      <Divider />
      <TableContainer>
        <Table sx={{ textAlign: 'center' }} aria-label="candidate table">
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell sx={{ width: '50% ', fontWeight: 500 }}>{row.name}</TableCell>
                <TableCell sx={{ textAlign: 'right', width: '50%' }}>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
