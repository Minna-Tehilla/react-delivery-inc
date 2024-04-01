import React, { useContext, useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { appContext } from '../App';

function Invoice() {
  const { customers, packages } = useContext(appContext);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const generateInvoices = () => {
      const newInvoices = [];
      customers.forEach(customer => {
        const customerPackages = packages.filter(pkg => pkg.customerid === customer.id);
        const totalWeight = customerPackages.reduce((acc, pkg) => acc + parseFloat(pkg.weight), 0);
        const totalPrice = customerPackages.reduce((acc, pkg) => acc + parseFloat(pkg.price), 0);
        newInvoices.push({
          customerName: customer.name,
          totalWeight,
          totalPrice
        });
      });
      setInvoices(newInvoices);
    };
    generateInvoices();
  }, [customers, packages]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Weight</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((row, index) =>
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.totalWeight}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Invoice;
