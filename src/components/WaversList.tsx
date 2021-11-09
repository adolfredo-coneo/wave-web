import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { waversList } from '../ethereum/waveContractHandler';
import { Typography } from '@mui/material';
import { Wave } from '../types';

interface Props {
  waveCount: string;
}

const WaversList: React.FC<Props> = ({ waveCount }) => {
  const [list, setList] = React.useState<Wave[]>([]);

  useEffect(() => {
    const getWaves = async () => {
      const list = await waversList();
      if (list.status) setList(list.result);
    };
    getWaves();
  }, [waveCount]);

  return (
    <TableContainer sx={{ marginTop: 5 }} component={Paper}>
      <Typography
        sx={{ flex: '1 1 100%', textAlign: 'center' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Rocking List
      </Typography>
      <Table sx={{ minWidth: 500 }} aria-label="Wavers list table">
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell align="right">Message</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row: Wave, key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {row.address}
              </TableCell>
              <TableCell align="right">{row.message}</TableCell>
              <TableCell align="right">{row.timestamp.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WaversList;
