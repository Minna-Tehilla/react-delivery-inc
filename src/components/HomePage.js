import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function HomePage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <img src="/logo.png" style={{ width: '200px', marginBottom: '20px' }} />
      <Typography variant="h4" gutterBottom>Welcome to Mail Delivery Service!</Typography>
      <Typography variant="body1" paragraph>
        Your trusted partner for efficient and reliable mail delivery services.
      </Typography>
      <Typography variant="body1" paragraph>
        Explore our services, including express delivery, parcel tracking, and international shipping.
      </Typography>
      <Typography variant="body1" paragraph>
        Join thousands of satisfied customers who trust us with their deliveries. Experience convenience and peace of mind
      </Typography>
    </Box>
  );
}

export default HomePage;
