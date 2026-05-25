"use client"
import { Card, CardContent, CardMedia, Typography, Container, CircularProgress, Box } from '@mui/material'
import Grid from '@mui/material/Grid2' // التعديل السحري هنا 🎯
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function BrandingPage() {
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(true)
    
    async function getBrands() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            setBrands(data.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBrands()
    }, [])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container sx={{ py: 4 }} maxWidth="xl">
            <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
                All Brands
            </Typography>

            {/* الـ Grid2 الجديد بيستخدم size لتحديد الأبعاد بالتفصيل أو الأبعاد العادية بالشكل ده */}
            <Grid container spacing={3}>
                {brands.map((brand: any) => (
                    <Grid key={brand._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Card sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.03)', boxShadow: 3 } 
                        }}>
                            <CardMedia 
                                component="img" 
                                image={brand.image}
                                alt={brand.name}
                                sx={{ height: 200, objectFit: 'contain', p: 2, bgcolor: '#ffffff' }} 
                            />
                            <CardContent sx={{ textAlign: 'center', borderTop: '1px solid #eee' }}>
                                <Typography variant="h6" component="h3" sx={{ fontWeight: '600' }}>
                                    {brand.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}