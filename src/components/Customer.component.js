import React, { useContext } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { appContext } from '../App';

function Customer() {
  const { customers, packages, setCustomers, setPackages } = useContext(appContext);
  const handleDeleteCustomer = (customerId) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    setCustomers(updatedCustomers);
  const updatedPackages = packages.filter((pkg) => pkg.customerid !== customerId);
    setPackages(updatedPackages);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Button variant="contained" component={Link} to={`/create-invoice/${row.id}`}>Create Invoice</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleDeleteCustomer(row.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Customer;
