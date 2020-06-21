import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Styles';
import Flexi from '../Flexi/Flexi';

import { CONFIG } from '../Constants';

const Homepage = ({ classes }) => {
  const [userData, setUserData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const onFlexiSubmit = (inputData) => {
    setUserData((userData) => userData.concat(inputData));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Box className={classes.formDivWrapper}>
        <Flexi flexiConfig={CONFIG} onFlexiSubmit={onFlexiSubmit} />
      </Box>

      <Box className={classes.formDivWrapper}>
        <Paper className={classes.tableWrapper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow hover>
                  <TableCell>Name</TableCell>
                  <TableCell align='right'>State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, idx) => (
                    <TableRow
                      hover
                      key={`${user.person_name}${idx}`}
                      className={classes.tableRow}
                    >
                      <TableCell component='th' scope='row'>
                        {user.person_name}
                      </TableCell>
                      <TableCell align='right'>{user.states}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component='div'
            count={userData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
};

Homepage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Homepage);
