import React, { useContext, useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Modal, Select, Typography, FormControl, InputLabel, MenuItem, TextField, Grid, Snackbar } from "@mui/material";
import { appContext } from "../App";

function AddPackageModal({ openMod, setOpenMod }) {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerOptions, setCustomerOptions] = useState([]);
    const { customers, packages, setPackages } = useContext(appContext);

    useEffect(() => {
        if (customers.length > 0) {
            const customerSelectOptions = customers.map(customer => ({
                value: parseInt(customer.id),
                label: customer.name,
            }));
            setCustomerOptions(customerSelectOptions);
        }
    }, [customers]);

    const closeModal = () => setOpenMod(false);
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const weight = parseFloat(formData.get('weight'));
        const price = parseFloat(formData.get('price'));
        if (!selectedCustomer || isNaN(weight) || isNaN(price)) {
            alert('Please fill out all fields correctly.');
            return;
        }

        const highestPackageId = Math.max(...packages.map(pkg => {
            const numPart = parseInt(pkg.id.match(/\d+$/)[0]);
            return isNaN(numPart) ? 0 : numPart;
        }));
        const newPackageId = `pak${highestPackageId + 1}`;
        const highestShippingOrder = Math.max(...packages.map(pkg => pkg.shippingOrder));
        const newShippingOrder = highestShippingOrder + 1;
        const newPackage = {
            id: newPackageId,
            weight: `${weight}kg`,
            customerid: selectedCustomer,
            price: price.toString(),
            shippingOrder: newShippingOrder,
        };
        setPackages(prevPackages => [...prevPackages, newPackage]);
        setSelectedCustomer(null);
        closeModal();
    };

    const handleChange = (event) => {
        setSelectedCustomer(event.target.value);
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    return (
        <>
            <Modal
                open={openMod}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        Add package:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField name="weight" label="Weight" fullWidth type='number' inputProps={{ min: 0 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="customer-select-label">Select a customer</InputLabel>
                                    <Select
                                        labelId="customer-select-label"
                                        id="customer-select"
                                        value={selectedCustomer}
                                        label="Select a customer"
                                        onChange={handleChange}
                                    >
                                        {customerOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="price" label="Price" fullWidth type='number' inputProps={{ min: 0 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">Add</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default AddPackageModal;

