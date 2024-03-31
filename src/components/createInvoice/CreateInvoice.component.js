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
    <Box p={1} textAlign="center" maxWidth="80%" mx="auto"> {/* Adjusted padding */}
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
          {/* <TableFooter> */}
          <TableRow sx={{ 
            "&:last-child td, &:last-child th": { border: 0 },
            borderTop: '2px solid darkgray' // Add this line for the dark line on top
          }}>
            <TableCell>Total:</TableCell>
            <TableCell>{invoiceData?.totalWeight}Kg</TableCell>
            <TableCell style={{ backgroundColor: 'lightgray' }}>{invoiceData?.totalPrice} NIS</TableCell>
          </TableRow>
          {/* </TableFooter> */}
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












// import React, { useState, useContext, useEffect } from 'react';
// import { appContext } from '../../App';
// import { useParams } from 'react-router-dom';
// import { Box, Table } from '@mui/material';

// function CreateInvoice() {

//   const { appData } = useContext(appContext);
//   const [invoiceData, setInvoiceData] = useState(null);
//   const { customerId } = useParams();


//   useEffect(() => {
//     generateInvoice();
//   }, [customerId]);

//   const generateInvoice = () => {
//     const newInvoiceNumber = Math.floor(Math.random() * 1000000);
//     const customerName = appData.customers.find(c => c.id === parseInt(customerId))?.name;
//     const packages = appData.packages.filter(p => p.customerid === parseInt(customerId));
//     console.log(customerId)


//     console.log(appData.customers.find(c => c.id === customerId))

//     const generatedInvoice = {
//       date: new Date().toLocaleDateString(),
//       customerName: customerName,
//       invoiceNumber: newInvoiceNumber,
//       packages: packages,
//       totalWeight: calculateTotalWeight(packages),
//       totalPrice: calculateTotalPrice(packages),
//       packageCount: packages.length
//     };
//     setInvoiceData(generatedInvoice);
//   };

//   const calculateTotalWeight = (packages) => {
//     return packages.reduce((total, p) => total + parseFloat(p.weight), 0);
//   };

//   const calculateTotalPrice = (packages) => {
//     return packages.reduce((total, p) => total + parseFloat(p.price), 0);
//   }
//   return (
//     <div>
//       <Box>
       
//       <h1>Invoice</h1>
//       {invoiceData && (
//         <div>
//           <Box>
//           <h2>Date: {invoiceData.date}</h2>
//           <h2>Customer Name: {invoiceData.customerName}</h2>
//           <h2>Invoice Number: {invoiceData.invoiceNumber}</h2>
//           </Box>
//           <h2>Packages:</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Weight</th>
//                 <th>Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoiceData.packages.map((packages, index) => (
//                 <tr key={index}>
//                   <td>{packages.id}</td>
//                   <td>{packages.weight}</td>
//                   <td>{packages.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <h2>Total Weight: {invoiceData.totalWeight}</h2>
//           <h2>Total Price: {invoiceData.totalPrice}</h2>
//           <p>You received {invoiceData.packageCount} packages. Thank you for using our services.</p>

//         </div> 
//       )}
//       </Box>
//     </div>
//   );
// }

// export default CreateInvoice;
