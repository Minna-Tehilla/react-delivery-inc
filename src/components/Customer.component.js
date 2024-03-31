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
  const { appData, setAppData } = useContext(appContext)
  console.log(appData)
  const handleDeleteCustomer = (customerId) => {
    const updatedPackages = appData.packages.filter((pkg)=>pkg.customerid !== customerId);
    console.log(updatedPackages)
   
    console.log(appData)
    const updatedCustomers = appData.customers.filter(
      (customer) => customer.id !== customerId
    );
    setAppData({  customers: updatedCustomers, packages : updatedPackages });
    console.log(appData)

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
            {appData.customers.map((row) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
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
  )
}

export default Customer