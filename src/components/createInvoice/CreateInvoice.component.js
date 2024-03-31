import React, { useState, useContext, useEffect } from 'react';
import { appContext } from '../../App';
import { useParams } from 'react-router-dom';
import { Box, Typography, Table, TableHead, TableBody, TableCell, TableRow, TableFooter } from '@mui/material';

function CreateInvoice() {
  const { appData } = useContext(appContext);
  const { customerId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    generateInvoice();
  }, [customerId]);
  const generateInvoice = () => {
    const newInvoiceNumber = Math.floor(Math.random() * 1000000);
    const customer = appData.customers.find(c => c.id === parseInt(customerId));
    const packages = appData.packages.filter(p => p.customerid === parseInt(customerId));
    const generatedInvoice = {
      date: new Date().toLocaleDateString(),
      customerName: customer ? customer.name : 'Unknown Customer',
      invoiceNumber: newInvoiceNumber,
      packages: packages,
      totalWeight: calculateTotalWeight(packages),
      totalPrice: calculateTotalPrice(packages),
      packageCount: packages.length
    };
    setInvoiceData(generatedInvoice);
  };
  const calculateTotalWeight = (packages) => {
    return packages.reduce((total, p) => total + parseFloat(p.weight), 0);
  };
  const calculateTotalPrice = (packages) => {
    return packages.reduce((total, p) => total + parseFloat(p.price), 0);
  }
  return (
    <Box p={1} textAlign="center" maxWidth="80%" mx="auto">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={4}>
        <Box>
          <Typography variant="h5">Date:{invoiceData?.date}</Typography>
          <Typography variant="h5">Customer:{invoiceData?.customerName}</Typography>
        </Box>
        <Box>
          <Typography variant="h3">Invoice</Typography>
          <Typography variant="h5">No. {invoiceData?.invoiceNumber}</Typography>
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell style={{ backgroundColor: 'lightgray' }}>Price</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceData?.packages.map((pkg, index) => (
            <TableRow key={index}>
              <TableCell>{pkg.id}</TableCell>
              <TableCell>{pkg.weight}</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray' }}>{pkg.price}</TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ 
            "&:last-child td, &:last-child th": { border: 0 },
            borderTop: '2px solid darkgray' 
          }}>
            <TableCell>Total:</TableCell>
            <TableCell>{invoiceData?.totalWeight}Kg</TableCell>
            <TableCell style={{ backgroundColor: 'lightgray' }}>{invoiceData?.totalPrice} NIS</TableCell>
          </TableRow>
        </TableBody>
      
      </Table>
      <Box mt={6}>
        <Typography variant="body1">You received {invoiceData?.packageCount} packages.</Typography>
        <Typography variant="body1">Thank you for using our services.</Typography>
      </Box>
    </Box>
  );
}

export default CreateInvoice;
