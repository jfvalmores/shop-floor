import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const DataGrid = (props) => {
  const classes = useStyles();

  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.def.map(cell =>
              <TableCell
                key={cell.datafield}>
                {cell.header}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {(props.list && props.list.length > 0) ?
            <React.Fragment>
              {props.list.map((row, index) => (
                <TableRow
                  hover
                  key={row.id}
                  onClick={() => props.onClick(index)}>
                  {props.def.map(cell =>
                    <TableCell
                      key={cell.datafield}
                      component="th"
                      scope="row">
                      {cell.type === 'hyperlink' ?
                        <a
                          href="#"
                          onClick={() => props.onClick(index)}>
                          {row[cell.datafield]}
                        </a>
                        :
                        <React.Fragment>
                          {row[cell.datafield]}
                        </React.Fragment>
                      }
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </React.Fragment>
            :
            <React.Fragment>
              <TableRow>
                <TableCell>
                  <p>No records found.</p>
                </TableCell>
              </TableRow>
            </React.Fragment>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataGrid;