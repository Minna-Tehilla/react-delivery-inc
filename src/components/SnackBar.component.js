import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Snackbar() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                severity="error"
                onClose={handleSnackbarClose}
            >
                {snackbarMessage}
            </MuiAlert>
        </Snackbar>


    )
}

export default Snackbar