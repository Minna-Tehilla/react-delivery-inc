import React, { useContext, useState } from 'react';
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { appContext } from "../App";
import AddPackageModal from './AddPackageModal.component';

function Package() {
  const { customers, packages, setPackages } = useContext(appContext);
  const [openMod, setOpenMod] = useState(false);

  const handleDeletePackage = (packageId) => {
    const updatedPackages = packages.filter(pkg => pkg.id !== packageId);
    setPackages(updatedPackages);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return; 
    const newPackages = [...packages];
    [newPackages[index].shippingOrder, newPackages[index - 1].shippingOrder] = [newPackages[index - 1].shippingOrder, newPackages[index].shippingOrder];
    setPackages(newPackages);
  };

  const handleMoveDown = (index) => {
    if (index === packages.length - 1) return; 
    const newPackages = [...packages];
    [newPackages[index].shippingOrder, newPackages[index + 1].shippingOrder] = [newPackages[index + 1].shippingOrder, newPackages[index].shippingOrder];
    setPackages(newPackages);
  };

  const openModal = () => setOpenMod(true);
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Shipping Order</TableCell>
              <TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={openModal}
                >
                  <AddIcon />
                </IconButton>
                <AddPackageModal openMod={openMod} setOpenMod={setOpenMod} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages
              .sort((a, b) => a.shippingOrder - b.shippingOrder)
              .map((row, index) => {
                const customer = customers.find((customer) => customer.id === row.customerid);
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell> {customer ? customer.name : 'Unknown'}</TableCell>
                    <TableCell>{row.weight}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <Button onClick={()=>{handleDeletePackage(row.id)}} variant="contained">Delete</Button>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleMoveUp(index)} disabled={index === 0}><ArrowUpwardIcon /></IconButton>
                      <IconButton onClick={() => handleMoveDown(index)} disabled={index === packages.length - 1}><ArrowDownwardIcon /></IconButton>
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

export default Package;
