"use client"
import React from 'react'
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material'

export default function ContactUs() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ p: { xs: 3, md: 5 }, boxShadow: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
        
        <Typography variant="h4" component="h1" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
          Contact Us
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField required fullWidth label="Your Name" variant="outlined" />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField required fullWidth type="email" label="Email Address" variant="outlined" />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ justifyContent: "center" }}>
            <TextField required fullWidth multiline rows={4} label="Message" variant="outlined" />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large" sx={{ px: 5, py: 1.5, fontWeight: 'bold' }}>
              Send Message
            </Button>
          </Grid>
        </Grid>

      </Box>
    </Container>
  )
}