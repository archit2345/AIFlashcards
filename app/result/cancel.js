'use client';
import { Typography, Container } from '@mui/material';

export default function CancelPage() {
  return (
    <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 20 }}>
      <Typography variant="h4">Payment Cancelled</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Your payment has been canceled. You can try again or contact support if you need help.
      </Typography>
    </Container>
  );
}
